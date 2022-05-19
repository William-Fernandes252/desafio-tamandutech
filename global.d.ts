// Desafio 1

declare const KP = 50;
declare const KI = 0;
declare const KD = 42;
declare const MAX_PWM = 203;

declare type speedParams = {
    max: number;
    min: number;
    base: number;
};

declare type pidParams = {
    setpoint: number;
};

declare type markings = {
    numLeft: number;
    numRight: number;
};

declare type encoders = {
    numLeft: number;
    numRight: number;
};

declare interface stateParams<Type> {
    [index: number]: Type /* 0 para curva, 1 para reta e 2 para parado */;
}

declare interface sensors<Type> {
    values: Map<Type, boolean>;
    mean: number;
}

declare type sideSensors = sensors<string>;
/* [['left', boolean], ['right', boolean]] */

declare type sensorsArray = sensors<number>;
/* [[0, boolean], [1, boolean], ...] */

declare interface motor {
    state: stateParams<speedParams>;
    write: CallableFunction;
}

declare interface Speed {
    motLeft: motor;
    motRight: motor;
}

declare interface PID {
    input: stateParams<pidParams>;
    output: number;
    lastError: number;
}

declare interface LF {
    state: number;
    speed: Speed;
    pid: PID;
    markings: markings;
    enc: encoders;
    sideSensors: sideSensors;
    sensorsArray: sensorsArray;
    lastUpdate: number;
}
