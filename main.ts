import * as controllers from './controllers'

const lineFollower: LF = {...}; /* Definição do seguidor de linha. */

// Desafios 2 e 3

function setup() {
    lineFollower.speed.motLeft.write(MAX_PWM);
    lineFollower.speed.motRight.write(MAX_PWM);
}

function loop() {
    controllers.setState(lineFollower);
    switch(lineFollower.state) {
        case 0: controllers.motorStop(lineFollower); break;
        case 1: case 2: 
            controllers.calcPID(lineFollower);
            controllers.motorControl(lineFollower);
            break;
    }
}

/* 
    Como objetos em javascript são passados por referência, 
    não há copia excessiva de dados na memória. 
*/