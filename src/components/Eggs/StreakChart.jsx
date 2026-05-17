import React from "react";
import { useTheme } from "@mui/material/styles";

export default function StreakChart({ results }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const luckyColor = isDark ? "#66bb6a" : "#2e7d32";
    const unluckyColor = isDark ? "#ef5350" : "#c62828";
    const axisColor = isDark ? "#b0b0b0" : "#555";
    const gridColor = isDark ? "#333" : "#ddd";
    const labelColor = theme.palette.text.primary;

    const overallMax = Math.max(results.bestWinStreak, results.worstLossStreak);
    const buckets = pickBuckets(overallMax);

    if (buckets.length === 0) {
        return (
            <p style={{ color: labelColor, fontStyle: "italic" }}>
                Not enough data to chart — try a larger number of attempts.
            </p>
        );
    }

    const data = buckets.map(([start, end]) => ({
        start,
        end,
        label: start === end ? String(start) : `${start}-${end}`,
        lucky: start <= results.bestWinStreak ? rangeCount(results.winStreakCounts, start, end) : null,
        unlucky: start <= results.worstLossStreak ? rangeCount(results.lossStreakCounts, start, end) : null,
    }));

    const maxLucky = Math.max(1, ...data.map(d => d.lucky || 0));
    const maxUnlucky = Math.max(1, ...data.map(d => d.unlucky || 0));

    const width = 720;
    const margin = { top: 50, right: 80, bottom: 40, left: 80 };
    const rowH = 28;
    const innerH = buckets.length * rowH;
    const innerW = width - margin.left - margin.right;
    const height = margin.top + innerH + margin.bottom;
    const centerX = margin.left + innerW / 2;
    const halfW = innerW / 2;
    const barH = Math.min(20, rowH * 0.7);

    const luckyTicks = niceTicks(maxLucky, 3);
    const unluckyTicks = niceTicks(maxUnlucky, 3);
    const niceLuckyMax = luckyTicks[luckyTicks.length - 1];
    const niceUnluckyMax = unluckyTicks[unluckyTicks.length - 1];

    const yForIndex = (idx) => margin.top + idx * rowH + rowH / 2;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            style={{ maxWidth: width, height: "auto", display: "block" }}
            role="img"
            aria-label="Diverging bar chart of lucky and unlucky streak counts"
        >
            {unluckyTicks.map((v, i) => {
                if (v === 0) return null;
                const x = centerX - (v / niceUnluckyMax) * halfW;
                return (
                    <g key={`ut-${i}`}>
                        <line x1={x} x2={x} y1={margin.top} y2={margin.top + innerH} stroke={gridColor} strokeDasharray="2 3" />
                        <text x={x} y={margin.top - 6} textAnchor="middle" fontSize="11" fill={labelColor}>
                            {v}
                        </text>
                    </g>
                );
            })}
            {luckyTicks.map((v, i) => {
                if (v === 0) return null;
                const x = centerX + (v / niceLuckyMax) * halfW;
                return (
                    <g key={`lt-${i}`}>
                        <line x1={x} x2={x} y1={margin.top} y2={margin.top + innerH} stroke={gridColor} strokeDasharray="2 3" />
                        <text x={x} y={margin.top - 6} textAnchor="middle" fontSize="11" fill={labelColor}>
                            {v}
                        </text>
                    </g>
                );
            })}

            <line
                x1={centerX}
                x2={centerX}
                y1={margin.top}
                y2={margin.top + innerH}
                stroke={axisColor}
                strokeWidth="1.5"
            />

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
                if (d.unlucky === null) return null;
                const w = (d.unlucky / niceUnluckyMax) * halfW;
                const y = yForIndex(idx) - barH / 2;
                const textWidth = String(d.unlucky).length * 7 + 8;
                const insideBar = w >= textWidth;
                return (
                    <g key={`u-${d.label}`}>
                        <rect
                            x={centerX - w}
                            y={y}
                            width={w}
                            height={barH}
                            fill={unluckyColor}
                            rx="2"
                        >
                            <title>{`Unlucky streaks of ${d.label} eggs: ${d.unlucky}`}</title>
                        </rect>
                        {d.unlucky > 0 && (
                            <text
                                x={insideBar ? centerX - 4 : centerX - w - 4}
                                y={yForIndex(idx)}
                                textAnchor="end"
                                dominantBaseline="middle"
                                fontSize="11"
                                fill={insideBar ? "#fff" : labelColor}
                            >
                                {d.unlucky}
                            </text>
                        )}
                    </g>
                );
            })}

            {data.map((d, idx) => {
                if (d.lucky === null) return null;
                const w = (d.lucky / niceLuckyMax) * halfW;
                const y = yForIndex(idx) - barH / 2;
                const textWidth = String(d.lucky).length * 7 + 8;
                const insideBar = w >= textWidth;
                return (
                    <g key={`l-${d.label}`}>
                        <rect
                            x={centerX}
                            y={y}
                            width={w}
                            height={barH}
                            fill={luckyColor}
                            rx="2"
                        >
                            <title>{`Lucky streaks of ${d.label} eggs: ${d.lucky}`}</title>
                        </rect>
                        {d.lucky > 0 && (
                            <text
                                x={insideBar ? centerX + 4 : centerX + w + 4}
                                y={yForIndex(idx)}
                                textAnchor="start"
                                dominantBaseline="middle"
                                fontSize="11"
                                fill={insideBar ? "#fff" : labelColor}
                            >
                                {d.lucky}
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

            <g transform={`translate(${margin.left}, 18)`}>
                <rect x="0" y="-10" width="12" height="12" fill={unluckyColor} rx="2" />
                <text x="18" y="0" fontSize="12" fill={labelColor}>
                    Unlucky (no legendaries)
                </text>
                <rect x="200" y="-10" width="12" height="12" fill={luckyColor} rx="2" />
                <text x="218" y="0" fontSize="12" fill={labelColor}>
                    Lucky (1+ legendary)
                </text>
            </g>
        </svg>
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

function pickBuckets(maxLen, targetCount = 5) {
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
