const MIN_TOKEN_LENGTH = 1;

export default class Search {
    constructor(categories) {
        this.index = {};
        this.guides = [];

        this.buildIndex(categories);
    }

    buildIndex(categories) {
        for (const cat of categories) {
            for (const guide of cat.guides) {
                let guideIndex = this.guides.length;
                this.guides.push({
                    ...guide,
                    categoryName: cat.webname,
                });

                const getValues = (object, parents = []) => Object.assign({}, ...Object
                    .entries(object)
                    .map(([k, v]) => v && typeof v === 'object'
                        ? getValues(v, [...parents, k])
                        : { [[...parents, k].join('.')]: v }
                    )
                );

                // From https://stackoverflow.com/a/34515563
                const searchable = Object.values(getValues(guide));
                const tokens = searchable
                    .join(" ")
                    .concat(" ", cat.webname, " ", cat.description)
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim()
                    .split(" ");

                for (const token of tokens) {
                    if (token.length < MIN_TOKEN_LENGTH) {
                        continue;
                    }

                    for (let i = MIN_TOKEN_LENGTH; i <= token.length; i++) {
                        const tokenVariant = token.substring(0, i);
                        if (tokenVariant in this.index) {
                            if (!this.index[tokenVariant].includes(guideIndex)) {
                                this.index[tokenVariant].push(guideIndex);
                            }
                        } else {
                            this.index[tokenVariant] = [guideIndex];
                        }
                    }
                }
            }
        }
    }

    Log() {
        console.log("Search index:", this.index);
        console.log("All possible search results:", this.guides);
    }

    Find(query) {
        query = query.replace(/[^a-zA-Z0-9\s]/g, " ").toLowerCase();
        const queries = query.trim().split(/\s+/);
        const results = [];
        let indices = new Set();

        for (let i = 0; i < queries.length; i++) {
            if (queries[i].length < MIN_TOKEN_LENGTH) {
                continue;
            }

            const matches = queries[i] in this.index ? this.index[queries[i]] : [];
            if (matches.length === 0) {
                indices = new Set();
                break;
            }

            if (indices.size === 0) {
                indices = new Set(matches);
                continue;
            }

            // Intersection of new and old
            // eslint-disable-next-line
            indices = new Set(matches.filter(v => indices.has(v)));
        }
        
        for (const idx of indices) {
            results.push(this.guides[idx]);
        }

        console.log(`results for ${query}:`, indices, results);
        return results;
    }
}
