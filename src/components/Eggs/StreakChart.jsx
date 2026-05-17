import React from "react";
import { useTheme } from "@mui/material/styles";

export default function StreakChart({ results }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const luckyColor = isDark ? "#66bb6a" : "#2e7d32";
    const unluckyColor = isDark ? "#ef5350" : "#c62828";
    const gridColor = isDark ? "#333" : "#ddd";
    const labelColor = theme.palette.text.primary;

    const hasAnyData = results.bestWinStreak > 0 || results.worstLossStreak > 0;

    if (!hasAnyData) {
        return (
            <p style={{ color: labelColor, fontStyle: "italic" }}>
                Not enough data to chart — try a larger number of attempts.
            </p>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Panel
                title="Lucky streaks"
                subtitle="Consecutive eggs with a legendary"
                max={results.bestWinStreak}
                counts={results.winStreakCounts}
                color={luckyColor}
                gridColor={gridColor}
                labelColor={labelColor}
                emptyLabel="No lucky streaks recorded."
            />
            <Panel
                title="Unlucky streaks"
                subtitle="Consecutive eggs with no legendary"
                max={results.worstLossStreak}
                counts={results.lossStreakCounts}
                color={unluckyColor}
                gridColor={gridColor}
                labelColor={labelColor}
                emptyLabel="No unlucky streaks recorded."
            />
        </div>
    );
}

function Panel({ title, subtitle, max, counts, color, gridColor, labelColor, emptyLabel }) {
    const buckets = pickBuckets(max);

    const header = (
        <div style={{ marginBottom: 4 }}>
            <div style={{ color: labelColor, fontWeight: 600 }}>
                {title} <span style={{ fontWeight: 400, opacity: 0.75 }}>
                    — longest: {max.toLocaleString()} {max === 1 ? "egg" : "eggs"}
                </span>
            </div>
            <div style={{ color: labelColor, fontSize: 12, opacity: 0.7 }}>{subtitle}</div>
        </div>
    );

    if (buckets.length === 0) {
        return (
            <div>
                {header}
                <p style={{ color: labelColor, fontStyle: "italic", margin: 0 }}>{emptyLabel}</p>
            </div>
        );
    }

    const data = buckets.map(([start, end]) => ({
        label: start === end ? start.toLocaleString() : `${start.toLocaleString()}–${end.toLocaleString()}`,
        count: rangeCount(counts, start, end),
    }));

    const maxCount = Math.max(1, ...data.map(d => d.count));
    const ticks = niceTicks(maxCount, 4);
    const niceMax = ticks[ticks.length - 1];

    const width = 720;
    const margin = { top: 28, right: 24, bottom: 36, left: 130 };
    const rowH = 28;
    const innerH = buckets.length * rowH;
    const innerW = width - margin.left - margin.right;
    const height = margin.top + innerH + margin.bottom;
    const barH = Math.min(20, rowH * 0.7);

    const yForIndex = (idx) => margin.top + idx * rowH + rowH / 2;
    const xForValue = (v) => margin.left + (v / niceMax) * innerW;

    return (
        <div>
            {header}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                width="100%"
                style={{ maxWidth: width, height: "auto", display: "block" }}
                role="img"
                aria-label={`${title}: distribution of streak lengths`}
            >
                {ticks.map((v, i) => {
                    const x = xForValue(v);
                    const isZero = v === 0;
                    return (
                        <g key={`t-${i}`}>
                            <line
                                x1={x}
                                x2={x}
                                y1={margin.top}
                                y2={margin.top + innerH}
                                stroke={isZero ? labelColor : gridColor}
                                strokeOpacity={isZero ? 0.6 : 1}
                                strokeWidth={isZero ? 1.5 : 1}
                                strokeDasharray={isZero ? "" : "2 3"}
                            />
                            <text
                                x={x}
                                y={margin.top - 8}
                                textAnchor="middle"
                                fontSize="11"
                                fill={labelColor}
                            >
                                {v.toLocaleString()}
                            </text>
                        </g>
                    );
                })}

                {data.map((d, idx) => (
                    <text
                        key={`y-${d.label}`}
                        x={margin.left - 8}
                        y={yForIndex(idx)}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill={labelColor}
                    >
                        {d.label}
                    </text>
                ))}
                <text
                    transform={`translate(14, ${margin.top + innerH / 2}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize="12"
                    fill={labelColor}
                >
                    Eggs in streak
                </text>

                {data.map((d, idx) => {
                    const w = (d.count / niceMax) * innerW;
                    const y = yForIndex(idx) - barH / 2;
                    const text = d.count.toLocaleString();
                    const textWidth = text.length * 7 + 8;
                    const insideBar = w >= textWidth;
                    return (
                        <g key={`b-${d.label}`}>
                            <rect
                                x={margin.left}
                                y={y}
                                width={w}
                                height={barH}
                                fill={color}
                                rx="2"
                            >
                                <title>{`Streaks of ${d.label} eggs: ${text}`}</title>
                            </rect>
                            {d.count > 0 && (
                                <text
                                    x={insideBar ? margin.left + w - 4 : margin.left + w + 4}
                                    y={yForIndex(idx)}
                                    textAnchor={insideBar ? "end" : "start"}
                                    dominantBaseline="middle"
                                    fontSize="11"
                                    fill={insideBar ? "#fff" : labelColor}
                                >
                                    {text}
                                </text>
                            )}
                        </g>
                    );
                })}

                <text
                    x={margin.left + innerW / 2}
                    y={height - 8}
                    textAnchor="middle"
                    fontSize="12"
                    fill={labelColor}
                >
                    Count of streaks
                </text>
            </svg>
        </div>
    );
}

function rangeCount(counts, start, end) {
    let total = 0;
    for (const len in counts) {
        const n = Number(len);
        if (n >= start && n <= end) total += counts[len];
    }
    return total;
}

function pickBuckets(maxLen, targetCount = 6) {
    if (!maxLen || maxLen <= 0) return [];
    if (maxLen <= targetCount) {
        return Array.from({ length: maxLen }, (_, i) => [i + 1, i + 1]);
    }
    const rawStep = maxLen / targetCount;
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const norm = rawStep / mag;
    let step;
    if (norm < 1.5) step = 1 * mag;
    else if (norm < 3) step = 2 * mag;
    else if (norm < 7) step = 5 * mag;
    else step = 10 * mag;
    const buckets = [];
    for (let start = 1; start <= maxLen; start += step) {
        const end = Math.min(start + step - 1, maxLen);
        buckets.push([start, end]);
    }
    return buckets;
}

function niceTicks(maxValue, targetCount) {
    if (maxValue <= 0) return [0, 1];
    const rawStep = maxValue / targetCount;
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const norm = rawStep / mag;
    let step;
    if (norm < 1.5) step = 1 * mag;
    else if (norm < 3) step = 2 * mag;
    else if (norm < 7) step = 5 * mag;
    else step = 10 * mag;
    const ticks = [];
    for (let v = 0; v <= maxValue + step * 0.0001; v += step) {
        ticks.push(Math.round(v));
    }
    if (ticks[ticks.length - 1] < maxValue) ticks.push(ticks[ticks.length - 1] + step);
    return ticks;
}
