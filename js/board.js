class Canvas {
    static canvas = document.getElementById('cc-board');

    static get HEIGHT() {
        return this.canvas.clientHeight;
    }

    static get WIDTH() {
        return this.canvas.clientWidth;
    }

    static get CELL_SIZE() {
        return (this.canvas.clientWidth - 9) / 9;
    }
}

class Board {
    constructor(canvas) {
        this.canvas = canvas;
        this.boardStatus = '00bch_01bho_02bel_03bad_04bge_05bad_06bel_07bho_08bch'
            + '_10000_11000_12000_13000_14000_15000_16000_17000_18000'
            + '_20000_21bca_22000_23000_24000_25000_26000_27bca_28000'
            + '_30bso_31000_32bso_33000_34bso_35000_36bso_37000_38bso'
            + '_40000_41000_42000_43000_44000_45000_46000_47000_48000'
            + '_50000_51000_52000_53000_54000_55000_56000_57000_58000'
            + '_60rso_61000_62rso_63000_64rso_65000_66rso_67000_68rso'
            + '_70000_71rca_72000_73000_74000_75000_76000_77rca_78000'
            + '_80000_81000_82000_83000_84000_85000_86000_87000_88000'
            + '_90rch_91rho_92rel_93rad_94rge_95rad_96rel_97rho_98rch';
        this.images = this.setImages();
        this.imagePositions = this.setImagePositions();
    }

    setImages() {
        //Black
        const bch = this.readImage('BChariot.png');
        const bho = this.readImage('BHorse.png');
        const bel = this.readImage('BElephant.png');
        const bge = this.readImage('BGeneral.png');
        const bad = this.readImage('BAdvisor.png');
        const bca = this.readImage('BCannon.png');
        const bso = this.readImage('BSoldier.png');
        //Red
        const rch = this.readImage('RChariot.png');
        const rho = this.readImage('RHorse.png');
        const rel = this.readImage('RElephant.png');
        const rge = this.readImage('RGeneral.png');
        const rad = this.readImage('RAdvisor.png');
        const rca = this.readImage('RCannon.png');
        const rso = this.readImage('RSoldier.png');

        return [
            ['bch', bch],
            ['bho', bho],
            ['bel', bel],
            ['bge', bge],
            ['bad', bad],
            ['bca', bca],
            ['bso', bso],
            ['rch', rch],
            ['rho', rho],
            ['rel', rel],
            ['rge', rge],
            ['rad', rad],
            ['rca', rca],
            ['rso', rso]
        ]
    }

    setImagePositions() {
        const imagePositions = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                imagePositions.push([Canvas.CELL_SIZE * j + 5, Canvas.CELL_SIZE * i + 5]);
            }
        }
        return imagePositions;
    }

    readImage(name) {
        const image = new Image();
        image.src = 'img/3d/' + name;
        return image;
    }

    drawBlankBoard() {
        const ctx = this.canvas.getContext('2d');

        // Horizontal
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.moveTo(Canvas.CELL_SIZE / 2 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * i + 1);
            ctx.lineTo(Canvas.CELL_SIZE * 8.5 + 8 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * i + 1);
            ctx.stroke();
        }

        // Vertical
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.moveTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * i + 1, Canvas.CELL_SIZE / 2 + 1);
            ctx.lineTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * i + 1, Canvas.CELL_SIZE * 9.5 + 10);
            ctx.stroke();
        }

        // River Side
        ctx.clearRect(Canvas.CELL_SIZE / 2 + 2, Canvas.CELL_SIZE * 4.5 + 6, Canvas.CELL_SIZE * 8, Canvas.CELL_SIZE - 1);

        // General house
        ctx.beginPath();
        // Top
        ctx.moveTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 3 + 1, Canvas.CELL_SIZE / 2 + 1);
        ctx.lineTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 5 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 2 + 1);
        ctx.moveTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 3 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 2 + 1);
        ctx.lineTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 5 + 1, Canvas.CELL_SIZE / 2 + 1);
        // Bot
        ctx.moveTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 3 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 7 + 1);
        ctx.lineTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 5 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 9 + 1);
        ctx.moveTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 3 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 9 + 1);
        ctx.lineTo(Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 5 + 1, Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * 7 + 1);
        ctx.stroke();
    }

    drawPieces() {
        const ctx = this.canvas.getContext('2d');
        const C_SIZE = Canvas.CELL_SIZE;
        const piecesOnBoard = this.boardStatus.split("_");
        for (const image of Object.values(this.images)) {
            for (const piece of piecesOnBoard) {
                if (image[0] === piece.slice(2)) {
                    let x = piece.charAt(0);
                    let y = piece.charAt(1);
                    ctx.drawImage(image[1], (C_SIZE + 1) * y + 1, (C_SIZE + 1) * x + 1, C_SIZE, C_SIZE);
                }
            }
        }
    }

    drawMovingPiece(x, y) {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        const C_SIZE = Canvas.CELL_SIZE;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        // Left Top
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + C_SIZE / 4);
        ctx.moveTo(x, y);
        ctx.lineTo(x + C_SIZE / 4, y);
        // Right Top
        ctx.moveTo(x + C_SIZE, y);
        ctx.lineTo(x + C_SIZE * 3 / 4, y);
        ctx.moveTo(x + C_SIZE, y);
        ctx.lineTo(x + C_SIZE, y + C_SIZE / 4);
        // Left Bot
        ctx.moveTo(x, y + C_SIZE);
        ctx.lineTo(x, y + C_SIZE * 3 / 4);
        ctx.moveTo(x, y + C_SIZE);
        ctx.lineTo(x + C_SIZE / 4, y + C_SIZE);
        // Right Bot
        ctx.moveTo(x + C_SIZE, y + C_SIZE);
        ctx.lineTo(x + C_SIZE * 3 / 4, y + C_SIZE);
        ctx.moveTo(x + C_SIZE, y + C_SIZE);
        ctx.lineTo(x + C_SIZE, y + C_SIZE * 3 / 4);
        ctx.stroke();
    }
}

class Position {
    constructor(clientX, clientY) {
        this.clientX = clientX;
        this.clientY = clientY;
    }

    getXY() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                let xCoordinate = Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * j + 1;
                let yCoordinate = Canvas.CELL_SIZE / 2 + (Canvas.CELL_SIZE + 1) * i + 1;

                if (this.getDistance(xCoordinate, yCoordinate) <= Canvas.CELL_SIZE / 2) {
                    return i + '' + j;
                }
            }
        }
        return '-1';
    }

    getDistance(toX, toY) {
        return Math.sqrt(
            Math.pow(this.clientX - toX, 2) + Math.pow(this.clientY - toY, 2)
        );
    }
}

const canvas = document.getElementById("cc-board");
ctx = canvas.getContext('2d');

const board = new Board(canvas);
$('#button').click(function (){
    board.drawBlankBoard();
    board.drawPieces();

    
});


let moving = undefined;

canvas.onclick = function (e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log('x: ' + x + '\ny: ' + y);

    const position = new Position(x, y);
    const xy = position.getXY();
    console.log(xy);
    if (xy !== '-1') {
        let index = board.boardStatus.indexOf(xy);
        let color = board.boardStatus.charAt(index + 2);
        const piece = board.boardStatus.slice(index, index + 5);
        const centerX = xy.slice(1) * (Canvas.CELL_SIZE + 1) + 1;
        const centerY = xy.slice(0, 1) * (Canvas.CELL_SIZE + 1) + 1;
        if (moving === undefined) {
            if (color !== '0') {
                console.log("Picked " + piece);
                moving = piece;
                console.log(centerX, centerY);
                board.drawMovingPiece(centerX, centerY);
            }
        } else {
            let newBoardStatus;
            newBoardStatus = board.boardStatus.replaceAll(moving, moving.substring(0, 2) + '000');
            newBoardStatus = newBoardStatus.replaceAll(piece, piece.substring(0, 2) + moving.substring(2));

            board.boardStatus = newBoardStatus;

            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            board.drawBlankBoard();
            board.drawPieces();
            board.drawMovingPiece(centerX, centerY);
            console.log(centerX, centerY);
            moving = undefined;
        }
    }
}