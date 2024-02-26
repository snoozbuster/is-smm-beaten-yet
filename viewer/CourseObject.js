export const DOOR_SUBTYPES = {
  Normal: 0,
  PSwitch: 1,
  Key: 2,
};

export const PIPE_DIRECTIONS = {
  Top: 2,
  Right: 0,
  Bottom: 3,
  Left: 1,
};

/**
 * @module CourseObject
 * This class is a struct for course objects.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class CourseObject {
  /**
   * @method module:CourseObject
   * Constructor of class
   * @var {Integer} x                 Axis-x position
   * @var {Integer} z                 Axis-x position
   * @var {Integer} y                 Axis-x position
   * @var {Integer} width             Width
   * @var {Integer} height            Height
   * @var {Integer} flags             Define sub-type
   * @var {Integer} childFlags        Unknow -
   * @var {Integer} extendedData      Define direction
   * @var {Integer} type              Type
   * @var {Integer} childType         Child type
   * @var {Integer} linkId            to Pipes and Rails
   * @var {Integer} effect            Effect
   * @var {Integer} transform         Tranformation
   * @var {Integer} childTransform    Child tranformation
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_objectData) {
    this.x = _objectData.x;
    this.z = _objectData.z;
    this.y = _objectData.y;
    this.width = _objectData.width;
    this.height = _objectData.height;
    this.flags = _objectData.flags;
    this.childFlags = _objectData.childFlags;
    this.extendedData = _objectData.extendedData;
    this.type = _objectData.type;
    this.childType = _objectData.childType;
    this.linkId = _objectData.linkId;
    this.effect = _objectData.effect;
    this.transform = _objectData.transform;
    this.childTransform = _objectData.childTransform;

    if (_objectData.type in CourseObject.extensions) {
      CourseObject.extensions[_objectData.type](this);
    }
  }

  /**
   * @method module:CourseObject::getType
   * Return the object class name
   * @access public
   * @return {String}
   */
  getType() {
    return this.constructor.name;
  }

  /**
   * @method module:CourseObject::isBlock
   * Check if is a block
   * @arg {Integer} _type     Game type
   * @static
   * @access public
   * @return {Boolean}
   */
  static is(_type) {
    return false;
  }
}

CourseObject.extensions = {
  // pipe
  9: (courseObject) => {
    courseObject.direction = (courseObject.flags & 0x60) / 0x20;
    courseObject.pipeLink =
      (Math.floor(courseObject.flags / 0x100000) % 0x10) - 1;
  },
  // door
  55: (courseObject) => {
    courseObject.doorLink = Math.floor(courseObject.flags / 0x200000) % 4;
    courseObject.doorType = (courseObject.flags >> 18) & 3;
  },
  // half-hit wall
  67: (courseObject) => {
    courseObject.direction = (courseObject.flags >> 22) & 3;
  },
};
