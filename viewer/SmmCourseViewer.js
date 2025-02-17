import _ from 'lodash';

/**
 * @module _SmmCourseViewer
 * This class can read and interpret a course (*.cdt) of Super Mario Maker game. (Vanilla JS)
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export default class SmmCourseViewer {
  /**
   * @method module:_SmmCourseViewer
   * Constructor of class
   * @var {Object} course
   * @var {Array[Object]} objects
   * @instance
   * @access public
   * @return {this}
   */
  constructor() {
    this.course = null;
    this.objects = null;
  }

  /**
   * @method module:_SmmCourseViewer::read
   * Read a file to extract course data
   * @arg {Blob} _file               .cdt file
   * @arg {Function} _callback       Callback function
   * @access public
   * @return {this}
   */
  read(_file, _callback = function () {}) {
    const $this = this;
    $this._file = _file;
    /* start read the file */
    $this._readBinaryFile($this._file, function (err, course, objects) {
      if (err) {
        _callback(true);
      } else {
        /* copy and callback */
        $this.course = course;
        $this.objects = objects;
        _callback(false, course, objects);
      }
    });
  }

  /**
   * @method module:_SmmCourseViewer::_readBinaryFile
   * Read a binary file *cdt
   * @arg {File} _file               .cdt file
   * @arg {Function} _callback       Callback function
   * @access private
   * @return {null}
   */
  _readBinaryFile(_file, _callback) {
    const $this = this;
    const reader = new FileReader();
    /* load file */
    reader.onloadend = function (eventReader) {
      try {
        const raw = reader.result;
        const rawHex = $this._raw2hex(raw);
        $this._interpreterBinaryFile(rawHex, _callback);
      } catch (err) {
        console.error('SmmCourseViewer: Error: Read the binary!');
        console.error(err);
        _callback(true);
      }
    };
    reader.readAsArrayBuffer(_file);
  }

  /**
   * @method module:_SmmCourseViewer::_raw2hex
   * Convert raw blob to hexadecimal array
   * @arg {String} _raw              Raw .cdt file
   * @access private
   * @return {Array[String]}
   */
  _raw2hex(_raw) {
    const rawBytes = new Uint8Array(_raw);
    const rawHex = [];
    for (let cycle = 0; cycle < _raw.byteLength; cycle++) {
      const value = rawBytes[cycle].toString(16);
      rawHex.push(value.length === 1 ? '0' + value : value);
    }
    return rawHex;
  }

  /**
   * @method module:_SmmCourseViewer::_rawHex2hex
   * Convert hexadecimal array to hexadecimal string
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the vector
   * @arg {Integer} _size            Length of the vector
   * @access private
   * @return {String}
   */
  _rawHex2hex(_rawHex, _pos, _size = 1) {
    let hexString = '';
    for (let idx = _pos; idx < _pos + _size; idx++) {
      hexString += _rawHex[idx];
    }
    return hexString;
  }

  /**
   * @method module:_SmmCourseViewer::_rawHex2sint
   * Convert hexadecimal array to signed integer
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the vector
   * @arg {Integer} _size            Length of the vector
   * @access private
   * @return {Integer}
   */
  _rawHex2sint(_rawHex, _pos, _size = 1) {
    /* extract hexadecimal and define sign rule */
    const hexString = this._rawHex2hex(_rawHex, _pos, _size);
    const hexParsed = parseInt(hexString, 16);
    const hexRule = {
      mask: 0x8 * Math.pow(16, hexString.length - 1),
      sub: -0x1 * Math.pow(16, hexString.length),
    };
    /* return value signed */
    if ((hexParsed & hexRule.mask) > 0) {
      return hexRule.sub + hexParsed; /* negative */
    } else {
      return hexParsed; /* positive */
    }
  }

  /**
   * @method module:_SmmCourseViewer::_rawHex2uint
   * Convert hexadecimal array to unsigned integer
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the vector
   * @arg {Integer} _size            Length of the vector
   * @access private
   * @return {Integer}
   */
  _rawHex2uint(_rawHex, _pos, _size = 1) {
    const hexString = this._rawHex2hex(_rawHex, _pos, _size);
    /* force unsigned (>>>) */
    return parseInt(hexString, 16) >>> 0;
  }

  /**
   * @method module:_SmmCourseViewer::_rawHex2string
   * Convert hexadecimal array to string
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the vector
   * @arg {Integer} _size            Length of the vector
   * @access private
   * @return {String}
   */
  _rawHex2string(_rawHex, _pos, _size = 1) {
    const hexString = this._rawHex2hex(_rawHex, _pos, _size).toString();
    /* convert hex to ascii */
    const asciiVal = hexString
      .match(/.{1,2}/g)
      .map(function (c) {
        return String.fromCharCode(parseInt(c, 16));
      })
      .join('');
    /* remove null digit (ascii = 0) */
    const str = asciiVal.match(/[\x01-\x7F]/g).join('');
    return str;
  }

  /**
   * @method module:_SmmCourseViewer::_rawHex2string
   * Convert hexadecimal array to UCS-2 string
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the vector
   * @arg {Integer} _size            Length of the vector
   * @access private
   * @return {String}
   */
  _rawHex2name(_rawHex, _pos, _size = 1) {
    const bytes = new Uint16Array(
      _.chunk(_rawHex.slice(_pos, _size + _pos), 2)
        .map((w) => parseInt(w.join(''), 16))
        .filter((w) => w !== 0),
    );

    return new TextDecoder('ucs-2').decode(bytes);
  }

  /**
   * @method module:_SmmCourseViewer::_interpreterBinaryFile
   * Interpreter the binary file
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Function} _callback       Callback function
   * @access private
   * @return {null}
   */
  _interpreterBinaryFile(_rawHex, _callback) {
    const $this = this;
    $this._courseInterpreter(_rawHex, function (course) {
      const objects = [];
      /* read objects - max 2600 objects */
      if (course.objectCount > 2600) {
        throw new Error(
          `Corrupted course file; object count is ${course.objectCount}`,
        );
      }
      for (let i = 0; i < course.objectCount; i++) {
        const pos = 0xf0 + 32 * i;
        const courseObject = $this._objectInterpreter(_rawHex, pos);
        const type = courseObject.type;
        /* is Block? or Monster? */
        const typedObject = BlockObject.is(type)
          ? new BlockObject(courseObject)
          : MonsterObject.is(type)
            ? new MonsterObject(courseObject)
            : courseObject;
        objects.push(typedObject);
      }
      _callback(false, course, objects);
    });
  }

  /**
   * @method module:_SmmCourseViewer::_courseInterpreter
   * Interpreter of course data from the binary file
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Function} _callback       Callback function
   * @access private
   * @return {null}
   */
  _courseInterpreter(_rawHex, _callback) {
    /* interpreter */
    const version = this._rawHex2uint(_rawHex, 0, 8);
    const checksum = this._rawHex2uint(_rawHex, 0x08, 4);
    const year = this._rawHex2uint(_rawHex, 0x10, 2);
    const month = this._rawHex2uint(_rawHex, 0x12, 1);
    const day = this._rawHex2uint(_rawHex, 0x13, 1);
    const hour = this._rawHex2uint(_rawHex, 0x14, 1);
    const minute = this._rawHex2uint(_rawHex, 0x15, 1);
    const name = this._rawHex2name(_rawHex, 0x28, 66);
    const mode = this._rawHex2string(_rawHex, 0x6a, 2);
    const themesMap = {
      0: 'overworld',
      1: 'underground',
      2: 'castle',
      3: 'airship',
      4: 'water',
      5: 'ghostHouse',
    };
    const theme = this._rawHex2uint(_rawHex, 0x6d, 1);
    const themeName = themesMap[theme];
    const timeLimit = this._rawHex2uint(_rawHex, 0x70, 2);
    const scrollMap = { 0: 'none', 1: 'slow', 2: 'medium', 3: 'fast' };
    const scroll = this._rawHex2uint(_rawHex, 0x72, 1);
    const scrollName = scrollMap[scroll];
    const flags = this._rawHex2uint(_rawHex, 0x73, 1);
    const areaWidth = this._rawHex2uint(_rawHex, 0x74, 4);
    const hexMiiData = this._rawHex2hex(
      _rawHex,
      0x78,
      60,
    ); /* usually nothing */
    const objectCount = this._rawHex2uint(_rawHex, 0xec, 4);
    /* course object */
    const objectData = {
      version,
      checksum,
      year,
      month,
      day,
      hour,
      minute,
      name,
      mode,
      theme,
      themeName,
      timeLimit,
      scroll,
      scrollName,
      flags,
      areaWidth,
      hexMiiData,
      objectCount,
    };
    const course = new Course(objectData);
    _callback(course);
  }

  /**
   * @method module:_SmmCourseViewer::_objectInterpreter
   * Interpreter of object data from the binary file
   * @arg {Array[String]} _rawHex    Raw hexadecimal array
   * @arg {Integer} _pos             Index of the object
   * @access private
   * @return {Object}
   */
  _objectInterpreter(_rawHex, _pos) {
    /* interpreter */
    let x = this._rawHex2uint(_rawHex, _pos, 4);
    let z = this._rawHex2uint(_rawHex, _pos + 0x04, 4);
    let y = this._rawHex2sint(_rawHex, _pos + 0x08, 2);
    const width = this._rawHex2sint(_rawHex, _pos + 0x0a, 1);
    const height = this._rawHex2sint(_rawHex, _pos + 0x0b, 1);
    const flags = this._rawHex2uint(_rawHex, _pos + 0x0c, 4);
    const childFlags = this._rawHex2uint(_rawHex, _pos + 0x10, 4);
    const extendedData = this._rawHex2uint(_rawHex, _pos + 0x14, 4);
    const type = this._rawHex2sint(_rawHex, _pos + 0x18, 1);
    const childType = this._rawHex2sint(_rawHex, _pos + 0x19, 1);
    const linkId = this._rawHex2sint(_rawHex, _pos + 0x1a, 2);
    const effect = this._rawHex2sint(_rawHex, _pos + 0x1c, 2);
    const transform = this._rawHex2sint(_rawHex, _pos + 0x1e, 1);
    const childTransform = this._rawHex2sint(_rawHex, _pos + 0x1f, 1);
    /* course object */
    x = parseInt(x / 160, 10);
    z = parseInt(z / 160, 10);
    y = parseInt(y / 160, 10); /* normalization */
    const objectData = {
      x,
      z,
      y,
      width,
      height,
      flags,
      childFlags,
      extendedData,
      type,
      childType,
      linkId,
      effect,
      transform,
      childTransform,
    };
    const courseObject = new CourseObject(objectData);
    return courseObject;
  }
}
