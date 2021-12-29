input.onButtonPressed(Button.A, function () {
    music.playTone(220, music.beat(BeatFraction.Sixteenth))
    Player.change(LedSpriteProperty.X, -1)
})
function doEnemy (en: number, row: number) {
    if (0 == en) {
        E0 = game.createSprite(en, row)
    }
    if (1 == en) {
        E1 = game.createSprite(en, row)
    }
    if (2 == en) {
        E2 = game.createSprite(en, row)
    }
    if (3 == en) {
        E3 = game.createSprite(en, row)
    }
    if (4 == en) {
        E4 = game.createSprite(en, row)
    }
}
function DispBlank (num: number) {
    for (let index = 0; index <= 4; index++) {
        delEnemy(index)
    }
}
function doTorp () {
    Torpedo = game.createSprite(Player.get(LedSpriteProperty.X), Player.get(LedSpriteProperty.Y))
    music.playTone(523, music.beat(BeatFraction.Sixteenth))
    music.playTone(784, music.beat(BeatFraction.Sixteenth))
    music.playTone(988, music.beat(BeatFraction.Sixteenth))
    for (let index = 0; index < 4; index++) {
        Torpedo.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
    Torpedo.delete()
    game.addScore(Enemy[Player.get(LedSpriteProperty.X)] * 50)
    delEnemy(Player.get(LedSpriteProperty.X))
    Enemy[Player.get(LedSpriteProperty.X)] = zero
}
input.onButtonPressed(Button.AB, function () {
    doTorp()
})
input.onButtonPressed(Button.B, function () {
    Player.change(LedSpriteProperty.X, 1)
    music.playTone(880, music.beat(BeatFraction.Sixteenth))
})
function delEnemy (num: number) {
    if (0 == num) {
        E0.delete()
    }
    if (1 == num) {
        E1.delete()
    }
    if (2 == num) {
        E2.delete()
    }
    if (3 == num) {
        E3.delete()
    }
    if (4 == num) {
        E4.delete()
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.playTone(988, music.beat(BeatFraction.Eighth))
    droid += 1
    if (droid > 1) {
        droid = 0
    }
})
function DispEnemy (num: number) {
    for (let index3 = 0; index3 <= 4; index3++) {
        if (Enemy[index3] == 1) {
            doEnemy(index3, num)
        }
    }
}
let Pause = 0
let Torpedo: game.LedSprite = null
let E4: game.LedSprite = null
let E3: game.LedSprite = null
let E2: game.LedSprite = null
let E1: game.LedSprite = null
let E0: game.LedSprite = null
let Player: game.LedSprite = null
let Enemy: number[] = []
let zero = 0
let droid = 0
droid = 0
let battle = 0
zero = 0
game.setLife(10)
images.createBigImage(`
    . . # # . . . . . .
    . # # # # . . . . .
    . . # # . . . # . .
    . . . . . . # # # .
    . . . . . . . # . .
    `).scrollImage(1, 200)
images.createBigImage(`
    . . # # . . . . . .
    . # # # # . . . . .
    . . # # . . . # . .
    . . . . . . # # # .
    . . . . . . . # . .
    `).scrollImage(1, 200)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
Enemy = [
1,
1,
1,
1,
1
]
let Blank = [
0,
0,
0,
0,
0
]
Player = game.createSprite(2, 4)
basic.forever(function () {
    basic.pause(2000)
    Pause = 3000
    while (true) {
        music.playTone(131, music.beat(BeatFraction.Quarter))
        battle = 1
        for (let index4 = 0; index4 <= 4; index4++) {
            DispEnemy(index4)
            basic.pause(Pause)
            DispBlank(index4)
        }
        for (let index5 = 0; index5 <= 4; index5++) {
            game.removeLife(Enemy[index5])
        }
        Enemy = [
        1,
        1,
        1,
        1,
        1
        ]
        Pause = Pause * 0.75
        battle = 0
    }
})
basic.forever(function () {
    if (droid == 1 && battle == 1) {
        for (let index = 0; index <= 4; index++) {
            Player.set(LedSpriteProperty.X, index)
            doTorp()
            basic.pause(100)
        }
        battle = 0
    }
})
