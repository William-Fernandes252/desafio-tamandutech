// Desafio 2

export function calcError(sensors: sensorsArray): number {
    let error: number = 0;
    if (
        sensors.values.get(0) &&
        !sensors.values.get(1) &&
        !sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = -4;
    else if (
        sensors.values.get(0) &&
        sensors.values.get(1) &&
        !sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = -3;
    else if (
        !sensors.values.get(0) &&
        sensors.values.get(1) &&
        !sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = -2;
    else if (
        !sensors.values.get(0) &&
        sensors.values.get(1) &&
        sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = -1;
    else if (
        !sensors.values.get(0) &&
        !sensors.values.get(1) &&
        sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = 0;
    else if (
        !sensors.values.get(0) &&
        !sensors.values.get(1) &&
        sensors.values.get(2) &&
        sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = 1;
    else if (
        !sensors.values.get(0) &&
        !sensors.values.get(1) &&
        !sensors.values.get(2) &&
        sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = 2;
    else if (
        !sensors.values.get(0) &&
        !sensors.values.get(1) &&
        !sensors.values.get(2) &&
        sensors.values.get(3) &&
        sensors.values.get(4)
    )
        error = 3;
    else if (
        !sensors.values.get(0) &&
        !sensors.values.get(1) &&
        !sensors.values.get(2) &&
        !sensors.values.get(3) &&
        !sensors.values.get(4)
    )
        error = 4;
    return error;
}

export function calcPID(lineFollower: LF): void {
    const p =
        lineFollower.pid.input[lineFollower.state].setpoint -
        calcError(lineFollower.sensorsArray);
    const i = lineFollower.pid.input[lineFollower.state].setpoint + p;
    const d = p - lineFollower.pid.lastError;
    lineFollower.pid.output = KP * p + KI * i + KD * d;
    lineFollower.pid.lastError = p;
}

export function motorControl(lineFollower: LF): void {
    const leftMotorSpeed = MAX_PWM - lineFollower.pid.output;
    const rightMotorSpeed = MAX_PWM + lineFollower.pid.output;
    lineFollower.speed.motLeft.write(leftMotorSpeed);
    lineFollower.speed.motRight.write(rightMotorSpeed);
}

export function readSideSensors(lineFollower: LF): boolean {
    /* 
    Retorna 'true' se marcações do lado esquerdo da 
    pista foram contabilizados e 'false' se o número de 
    marcações lidas pelo sensor direito ser igual a 2 (condição de parada). 
    */
    if (lineFollower.sideSensors.values.get('left'))
        lineFollower.markings.numLeft++;
    if (lineFollower.sideSensors.values.get('right'))
        lineFollower.markings.numRight++;
    if (lineFollower.markings.numRight === 2) return false;
    return true;
}

export function setState(lineFollower: LF) {
    if (
        [...lineFollower.sensorsArray.values.values()].every(value => !value) ||
        !readSideSensors(lineFollower)
    ) {
        /* 
        Parar robo se ele estiver totalmente fora da linha 
        ou pela condição de parada. 
        */
        lineFollower.state = 0;
    } else if (
        !lineFollower.sensorsArray.values.get(0) &&
        !lineFollower.sensorsArray.values.get(1) &&
        lineFollower.sensorsArray.values.get(2) &&
        !lineFollower.sensorsArray.values.get(3) &&
        !lineFollower.sensorsArray.values.get(4)
    ) {
        lineFollower.state = 1;
    } else {
        lineFollower.state = 2;
    }
}

export function motorStop(lineFollower: LF) {
    lineFollower.speed.motLeft.write(0);
    lineFollower.speed.motRight.write(0);
}
