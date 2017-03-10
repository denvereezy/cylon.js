const Cylon = require('cylon');
const keypress = require('keypress');

keypress(process.stdin);

Cylon.robot({
    connections: {
        arduino: {
            adaptor: 'firmata',
            port: '/dev/ttyACM0'
        }
    },

    devices: {
        left_wheel: {
            driver: 'continuous-servo',
            pin: 3
        },
        right_wheel: {
            driver: 'continuous-servo',
            pin: 4
        }
    },

    work: function(car) {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', function(ch, key) {

            switch (key.name) {
                case 'up':
                    console.log('forward');
                    car.left_wheel.clockwise();
                    car.right_wheel.counterClockwise();
                    break;
                case 'down':
                    console.log('reverse');
                    car.left_wheel.counterclockWise();
                    car.right_wheel.clockwise();
                    break;
                case 'right':
                    console.log('right');
                    car.left_wheel.counterclockWise();
                    car.right_wheel.counterclockWise();
                    break;
                case 'left':
                    console.log('left');
                    car.left_wheel.clockwise();
                    car.right_wheel.clockwise();
                    break;
                case 'space':
                    console.log('stop');
                    car.left_wheel.stop();
                    car.right_wheel.stop();
                    break;
                default:
                    console.log(key.name);
            };
        };
    };
}).start();
