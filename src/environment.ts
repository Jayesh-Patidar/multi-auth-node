interface EnvironmentInterface {
    APP: {
        SCHEME: string;
        HOST: string;
        PORT: number;
    };

    DB: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: 27017;
        DATABASE: string;
        AUTH: string;
    };

    SECRET: {
        JWT: string;
        REFRESH: string;
    };
}

const Environment: EnvironmentInterface = {
    APP: {
        SCHEME: "http",
        HOST: "127.0.0.1",
        PORT: 8000,
    },

    DB: {
        USERNAME: "",
        PASSWORD: "",
        HOST: "127.0.0.1",
        PORT: 27017,
        DATABASE: "multi-auth",
        AUTH: "admin",
    },

    SECRET: {
        JWT: "XYSGHJDGJSE",
        REFRESH: "SDEKDJBDIEI",
    },
};

export default Environment;
