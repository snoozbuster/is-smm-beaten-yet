import { CourseObject } from './CourseObject';

/**
 * @module BlockObject
 * This class represents the block objects.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class BlockObject extends CourseObject {
  /**
   * @method module:BlockObject
   * Constructor of class
   * @extends CourseObject
   * @arg {Object} _objectData
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_objectData) {
    super(_objectData);
    this.name = BlockObject.names[this.type];
    this.size = 1;
    const ext = this._extAttributes(_objectData);
    this.subType = ext.subType;
  }

  /**
   * @method module:BlockObject::isBlock
   * Check if is a block
   * @arg {Integer} _type     Game type
   * @static
   * @access public
   * @return {Boolean}
   */
  static is(_type) {
    return !!BlockObject.names[_type];
  }

  /**
   * @method module:BlockObject::_extAttributes
   * Extends the attributes class
   * @arg {Object} _objectData    Object data
   * @access private
   * @return {Object}
   */
  _extAttributes(_objectData) {
    const flags = _objectData.flags;
    const subType = (flags & 7) >> 2; // extract bit  3

    return {
      subType,
    };
  }
}

/**
 * @method module:BlockObject::names
 * Objects Name
 * @var {Object}     names
 * @access public
 */
BlockObject.names = {
  4: 'RengaBlock' /* Brick Block */,
  5: 'HatenaBlock' /* "?" Block */,
  6: 'HardBlock' /* Wooden Block */,
  7: 'Ground' /* Terrain */,
  8: 'Coin',
  9: 'Dokan' /* Pipe */,
  14: 'GroundMushroom' /* Terrain: Mushroom */,
  16: 'GroundBox' /* Terrain: Box */,
  17: 'Bridge',
  21: 'ChikuwaBlock' /* Donut Block */,
  22: 'KumoBlock' /* Cloud Block */,
  23: 'OnpuBlock' /* Note Block */,
  26: 'GroundGoal',
  29: 'ClearBlock' /* Clear "?" Block */,
  37: 'GroundStart',
  43: 'Toge' /* Spiny Block */,
  49: 'CastleBridge',
  53: 'BeltConveyor',
  59: 'Rail',
  63: 'IceBlock',
  64: 'Tsuta' /* VineBlock */,
};

/**
 * @method module:BlockObject::codes
 * Objects Code
 * @var {Object}     codes
 * @access public
 */
BlockObject.codes = {
  RengaBlock: 4,
  HatenaBlock: 5,
  HardBlock: 6,
  Ground: 7,
  Coin: 8,
  Dokan: 9,
  GroundMushroom: 14,
  GroundBox: 16,
  Bridge: 17,
  ChikuwaBlock: 21,
  KumoBlock: 22,
  OnpuBlock: 23,
  GroundGoal: 26,
  ClearBlock: 29,
  GroundStart: 37,
  Toge: 43,
  CastleBridge: 49,
  BeltConveyor: 53,
  Rail: 59,
  IceBlock: 63,
  Tsuta: 64,
};
