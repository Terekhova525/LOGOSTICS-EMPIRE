export const AppConfig = Object.freeze({
    application: {
        name: 'Logistics Empire',
        version: '0.1.0'
    },

    rendering: {
        backgroundColor: 0x1b1b1b,
        antialias: true,
        autoDensity: true
    }
});

export type AppConfig = typeof AppConfig;