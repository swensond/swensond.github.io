module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "media",
    theme: {
        fontFamily: {
            sans: ["Open Sans"],
            title: ["Dancing Script"]
        },
        extend: {
            colors: {
                header: "#ffffff",
                background: "#e5e5e5",
                "skill-pill": "#30c7b4",
                "skill-pill-ring": "#264653"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
