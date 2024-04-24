import H from '@vladmandic/human'

/**
 * @type {import('@vladmandic/human').Config}
 */
export const humanConfig = {
    async: false,
    backend: "cpu",
    debug: true,
    cacheSensitivity: 0,
    cacheModels: true,
    warmup: 'face',
    // modelBasePath: 'https://www.jsdelivr.com/package/npm/@vladmandic/human-models/models/',
    modelBasePath: '@vladmandic/human-models/models',
    face: {
        scale: 1.4,
        detector: { enabled: true, maxDetected: 1, minSize: 256 },
        mesh: { enabled: true },
        iris: { enabled: false },
        description: { enabled: false },
        emotion: { enabled: true, crop: 0.15 },
    },
    body: { enabled: false },
    hand: { enabled: false },
    object: { enabled: false },
    gestures: { enabled: false },
};

export const human = new H.Human(humanConfig);