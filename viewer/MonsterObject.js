import { CourseObject } from './CourseObject';

/**
 * @module MonsterObject
 * This class represents the monster objects.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class MonsterObject extends CourseObject {
  /**
   * @method module:MonsterObject
   * Constructor of class
   * @extends CourseObject
   * @arg {Object} _objectData
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_objectData) {
    /* general attr */
    super(_objectData);
    this.name = MonsterObject.names[this.type];
    /* extended attr */
    const ext = this._extAttributes(_objectData);
    this.extend = ext.extend;
    this.subType = ext.subType;
    this.wing = ext.wing;
    this.size = ext.size;
    this.y = this.y + ext.addY;
    this.direction = this.direction ?? ext.direction;
  }

  /**
   * @method module:MonsterObject::isBlock
   * Check if is a block
   * @arg {Integer} _type     Game type
   * @static
   * @access public
   * @return {Boolean}
   */
  static is(_type) {
    return !!MonsterObject.names[_type];
  }

  /**
   * @method module:MonsterObject::_extAttributes
   * Extends the attributes class
   * @arg {Object} _objectData    Object data
   * @access private
   * @return {Object}
   */
  _extAttributes(_objectData) {
    const flags = _objectData.flags;
    const type = _objectData.type;
    const subType = (flags & 7 & 4) >> 2;
    const wing = (flags & 7 & 2) >> 1;
    const size =
      type !== 3 ? ((flags & 16384) >> 14) + 1 : 1; /* 0x4000 = 16384 */
    const extend = [];
    const direction = (_objectData.flags >> 23) & 3; /* 0x17 = 23 */
    const addY = _objectData.type === 30 ? 1 : 0;

    // type = 0 (normal), 1 (wings)
    // size = 0 (normal), 1 (big)
    if (wing) {
      const y = (_objectData.height - 1) / 5.0;
      extend.push({ x: 0.65, y, xT: 1, yT: 2 }); // right wing
      extend.push({ x: -0.65, y, xT: 0, yT: 2 }); // left wing
    }
    return {
      extend,
      subType,
      wing,
      size,
      addY,
      direction,
    };
  }
}

/**
 * @method module:MonsterObject::names
 * Monsters Name
 * @var {Object}     names
 * @access public
 */
MonsterObject.names = {
  0: 'Kuribo' /* Goomba */,
  1: 'Nokonoko' /* Koopa Troopa */,
  2: 'Pakkun' /* Piranha Plant */,
  3: 'HammerBro',
  10: 'JumpStep',
  11: 'Lift' /* Moving Platform */,
  12: 'Dossun' /* Thwomp */,
  13: 'KillerHoudai' /* Bullet Bill Cannon */,
  15: 'Bombhei' /* Bob-Omb */,
  18: 'PSwitch',
  19: 'PowBlock',
  20: 'SuperKinoko' /* Mushroom */,
  24: 'FireBar',
  25: 'Togezo' /* Spiny */,
  27: 'GoalPole',
  28: 'Met' /* Buzzy Beetle */,
  30: 'Jugem' /* Lakitu */,
  31: 'JugemCloud' /* Lakitu"s Cloud */,
  32: 'Tsuta' /* Vine Head */,
  33: 'UpKinoko' /* 1 UP */,
  34: 'FireFlower',
  35: 'SuperStar',
  36: 'YouganLift',
  38: 'StartSignBoard',
  39: 'Kameck',
  40: 'Togemet' /* Spike Top */,
  41: 'Teresa' /* Boo */,
  42: 'KoopaClown',
  44: 'CharaKinoko',
  45: 'KutsuKuribo' /* Goomba"s Shoe/Yoshi Egg */,
  46: 'Karon' /* Dry Bones */,
  47: 'SenkanHoudai' /* Cannon */,
  48: 'Gesso' /* Blooper */,
  50: 'FunnyKinoko' /* Weird Mushroom */,
  51: 'DekaKinoko' /* Mega Mushroom */,
  52: 'Hanachan' /* Wiggler */,
  54: 'Burner' /* Burner */,
  55: 'Door',
  56: 'Pukupuku' /* Cheep Cheep */,
  57: 'BlackPakkun' /* Muncher */,
  58: 'Poo' /* Rocky Wrench */,
  60: 'Bubble' /* Podoboo */,
  61: 'Wanwan' /* Chain Chomp */,
  62: 'Koopa' /* Bowser */,
  65: 'Player',
  66: 'AirSignBoard',
  67: 'HalfHitWall' /* One-way Gate */,
  68: 'Saw' /* Grinder */,
  69: 'Player',
};

/**
 * @method module:MonsterObject::codes
 * Monsters Code
 * @var {Object}     codes
 * @access public
 */
MonsterObject.codes = {
  Kuribo: 0,
  Nokonoko: 1,
  Pakkun: 2,
  HammerBro: 3,
  JumpStep: 10,
  Lift: 11,
  Dossun: 12,
  KillerHoudai: 13,
  Bombhei: 15,
  PSwitch: 18,
  PowBlock: 19,
  SuperKinoko: 20,
  FireBar: 24,
  Togezo: 25,
  GoalPole: 27,
  Met: 28,
  Jugem: 30,
  JugemCloud: 31,
  Tsuta: 32,
  UpKinoko: 33,
  FireFlower: 34,
  SuperStar: 35,
  YouganLift: 36,
  StartSignBoard: 38,
  Kameck: 39,
  Togemet: 40,
  Teresa: 41,
  KoopaClown: 42,
  CharaKinoko: 44,
  KutsuKuribo: 45,
  Karon: 46,
  SenkanHoudai: 47,
  Gesso: 48,
  FunnyKinoko: 50,
  DekaKinoko: 51,
  Hanachan: 52,
  Burner: 54,
  Door: 55,
  Pukupuku: 56,
  BlackPakkun: 57,
  Poo: 58,
  Bubble: 60,
  Wanwan: 61,
  Koopa: 62,
  Player: 65,
  AirSignBoard: 66,
  HalfHitWall: 67,
  Saw: 68,
  /* "Player": 69, */
};
