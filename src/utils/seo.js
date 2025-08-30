// SEO utility functions for dynamic metadata management

const DEFAULT_META = {
    title: "Bit Heroes Guides - Comprehensive game guides, Calculators & Resources",
    description: "Comprehensive Bit Heroes guides, calculators, and resources. Find D4/Ancient guides, familiar and fusion information, various calculators, and community-created content.",
    keywords: "Bit Heroes, game guides, calculators, D4 guides, ancient guides, familiars, builds, gaming resources"
};

const ROUTE_META = {
    "/": {
        title: "Bit Heroes Guides - Community Game Resources",
        description: "Browse comprehensive Bit Heroes guides including D4/Ancient strategies, familiar and fusion information, and community-created content.",
        keywords: "Bit Heroes guides, D4 guides, ancient guides, familiar and fusion information"
    },
    "/item-find": {
        title: "Item Find and Capture Rate Calculators - Bit Heroes Guides",
        description: "Calculate capture rates and item find chances for Bit Heroes. Use these tools to optimize farming strategies.",
        keywords: "Bit Heroes calculator, item find, capture rate, farming calculator, drop rates"
    },
    "/turn-rate": {
        title: "Turn Rate Calculator - Bit Heroes Guides",
        description: "Calculate player turn rates for Bit Heroes. Optimize your team composition and battle efficiency.",
        keywords: "Bit Heroes turn rate, combat calculator, battle speed, team optimization"
    },
    "/familiar-calc": {
        title: "Familiar Stats Calculator - Bit Heroes Guides", 
        description: "Calculate familiar stats given a players stats to optimize familiar and fusions for maximum effectiveness in Bit Heroes.",
        keywords: "Bit Heroes familiar calculator, damage calculator, familiar and fusion information, familiar optimization"
    },
    "/eggs": {
        title: "Egg Calculator - Bit Heroes Guides", 
        description: "Calculate egg opening chances and legendary drop rates for Bit Heroes. Optimize your egg opening strategy.",
        keywords: "Bit Heroes egg calculator, legendary drop rates, egg opening, pet eggs, accessory chests"
    }
};

export function updatePageMeta(route = "/") {
    const meta = ROUTE_META[route] || DEFAULT_META;
    
    // Update document title
    document.title = meta.title;
    
    // Update meta description
    updateMetaTag("description", meta.description);
    
    // Update meta keywords
    updateMetaTag("keywords", meta.keywords);
    
    // Update Open Graph tags
    updateMetaProperty("og:title", meta.title);
    updateMetaProperty("og:description", meta.description);
    updateMetaProperty("og:url", `https://bhguides.com${route === "/" ? "" : "#" + route}`);
    
    // Update Twitter tags
    updateMetaTag("twitter:title", meta.title);
    updateMetaTag("twitter:description", meta.description);
}

function updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) {
        meta.setAttribute("content", content);
    } else {
        meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    }
}

function updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
        meta.setAttribute("content", content);
    } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.content = content;
        document.head.appendChild(meta);
    }
}

export function updateGuidesMeta(guideName, description) {
    const title = `${guideName} - Bit Heroes Guides`;
    const desc = description || `${guideName} guide for Bit Heroes. Community-created content and strategies.`;
    
    document.title = title;
    updateMetaTag("description", desc);
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", desc);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", desc);
}