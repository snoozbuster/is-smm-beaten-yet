/**
 * @module MonsterDraw
 * This class draw the monsters from layout/draw/monster/.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class MonsterDraw {
  /**
   * @method module:MonsterDraw
   * Constructor of class
   * @arg {String} _gameMode      Game mode
   * @arg {String} _gameTheme     Game theme
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_gameMode, _gameTheme) {
    /* game definitions */
    this._gameMode = _gameMode;
    this._gameTheme = _gameTheme;
    /* theme definitions */
    this._themeLimit = {
      length: { x: 16, y: 20 }, // blocks counting
      size: { M1: 16, M3: 16, MW: 16, WU: 128 },
    }; // pixels
    this._themeSize = this._themeLimit.size[_gameMode];
    this._theme = new Image(
      this._themeSize * this._themeLimit.length.x,
      this._themeSize * this._themeLimit.length.y,
    );
    this._theme.src = '/layout/draw/monster/' + _gameMode + '.png';
  }

  /**
   * @method module:MonsterDraw::getTheme
   * Return the theme image
   * @access public
   * @return {HTML Element}
   */
  getTheme() {
    return this._theme;
  }

  /**
   * @method module:MonsterDraw::getThemeSize
   * Return the theme size
   * @access public
   * @return {Integer}
   */
  getThemeSize() {
    return this._themeSize;
  }

  /**
   * @method module:MonsterDraw::getDef
   * Return the monster definitions
   * @arg {Integer} _type        Object type
   * @access public
   * @return {Object}
   */
  getDef(_type) {
    return MonsterDraw._defitions[_type];
  }

  /**
   * @method module:MonsterDraw::hasDraw
   * Check if this type has a draw
   * @arg {Integer} _type        Object type
   * @access public
   * @return {Object}
   */
  hasDraw(_type) {
    return !!this.getDef(_type);
  }

  /**
   * @method module:MonsterDraw::_extendForObjects
   * Auxiliar function to extend objects
   * @arg {Object}  extend       Object extend
   * @arg {Integer} width        Object width
   * @arg {Integer} height       Object height
   * @arg {Integer} xT           Theme x-axis position
   * @arg {Integer} yT           Theme y-axis position
   * @arg {Integer} x            X-axis position addition
   * @arg {Integer} y            Y-axis position addition
   * @static
   * @access private
   * @return {Array[Object]}
   */
  static _extendForObjects(extend, weight, height, xT, yT, x = 0, y = 0) {
    for (let w = 0; w < weight; w++) {
      for (let h = 0; h < height; h++) {
        extend.push({ x: -w + x, y: h + y, xT: xT - w, yT: yT - h });
      }
    }
    return extend;
  }
}

/**
 * @method module:MonsterDraw::_defitions
 * Monster Draw Definitions
 * @access private
 */
MonsterDraw._defitions = {
  0: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      return MonsterDraw._extendForObjects(extend, 1, 2, 1, 1);
    },
  },
  1: {
    extend: function (courseObject) {
      let extend = courseObject.extend;
      const subType = courseObject.subType;
      /* red */
      extend = subType
        ? MonsterDraw._extendForObjects(extend, 1, 2, 2, 3)
        : /* green */
          MonsterDraw._extendForObjects(extend, 1, 2, 2, 1);
      return extend;
    },
  },
  2: {
    extend: function (courseObject) {
      let extend = courseObject.extend;
      const subType = courseObject.subType;
      /* fire */
      extend = subType
        ? MonsterDraw._extendForObjects(extend, 1, 2, 3, 3)
        : /* pakkun */
          MonsterDraw._extendForObjects(extend, 1, 2, 3, 1);
      return extend;
    },
  },
  3: {
    extend: function (courseObject) {
      let extend = courseObject.extend;
      const width = courseObject.width;
      /* big HammerBro */
      extend =
        width - 1
          ? MonsterDraw._extendForObjects(extend, 2, 2, 5, 3)
          : /* HammerBro */
            MonsterDraw._extendForObjects(extend, 1, 2, 4, 1);
      return extend;
    },
  },
  10: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* horizontal */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 5, yT: 1 });
      } else {
        /* vertical */
        extend.push({ x: 0, y: 0, xT: 5, yT: 0 });
      }
      return extend;
    },
  },
  11: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      let extend;
      /* blue */
      if (subType) {
        return MonsterDraw._extendForObjects([], 4, 1, 9, 1, 1);
      }
      /* white */
      return MonsterDraw._extendForObjects([], 4, 1, 9, 0, 1);
    },
  },
  12: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* skewer */
      if (subType) {
        return MonsterDraw._extendForObjects(extend, 4, 4, 3, 19, 1);
      }
      /* thwomp */
      return MonsterDraw._extendForObjects(extend, 2, 2, 11, 1);
    },
  },
  13: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      const height = courseObject.height;
      const extend = [];
      const tt = subType
        ? { 0: { xT: 11, yT: 2 }, 1: { xT: 11, yT: 3 }, 2: { xT: 11, yT: 4 } }
        : {
            0: { xT: 12, yT: 0 },
            1: { xT: 12, yT: 1 },
            2: { xT: 12, yT: 2 },
          };
      for (let h = 0; h < height; h++) {
        const pos = h === height - 2 ? 1 : h === height - 1 ? 0 : 2;
        extend.push({ x: 0, y: h, xT: tt[pos].xT, yT: tt[pos].yT });
      }
      return extend;
    },
  },
  15: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* active */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 13, yT: 1 });
      } else {
        /* normal */
        extend.push({ x: 0, y: 0, xT: 13, yT: 0 });
      }
      return extend;
    },
  },
  18: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 4, yT: 16 });
      } else {
        extend.push({ x: 0, y: 0, xT: 14, yT: 0 });
      }
      return extend;
    },
  },
  19: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 14, yT: 1 });
      return extend;
    },
  },
  20: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 6 });
      return extend;
    },
  },
  24: {
    extend: function (courseObject) {
      const extend = [];
      extend.push({ x: 0, y: 0, xT: 13, yT: 2 });
      extend.push({ x: 1, y: 0, xT: 14, yT: 2 });
      return extend;
    },
  },
  25: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 2, yT: 4 });
      return extend;
    },
  },
  27: { xT: 0, yT: 0 },
  28: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 4, yT: 4 });
      return extend;
    },
  },
  30: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 8, yT: 2 });
      return extend;
    },
  },
  31: {
    extend: function (courseObject) {
      const extend = [];
      extend.push({ x: 0, y: 0, xT: 8, yT: 3 });
      extend.push({ x: 1, y: 0, xT: 9, yT: 3 });
      extend.push({ x: -1, y: 0, xT: 9, yT: 2 });
      return extend;
    },
  },
  32: {
    xT: 0,
    yT: 0,
    func: function (courseObject) {
      console.log(courseObject);
      return { xT: 0, yT: 0 };
    },
  },
  33: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 1 });
      return extend;
    },
  },
  34: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 2 });
      return extend;
    },
  },
  35: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 3 });
      return extend;
    },
  },
  36: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      const extend = [];
      /* blue : white */
      const tt = subType ? { xT: 11, yT: 8 } : { xT: 10, yT: 8 };
      extend.push({ x: 1, y: 0, xT: tt.xT, yT: tt.yT });
      extend.push({ x: 0, y: 0, xT: tt.xT, yT: tt.yT });
      extend.push({ x: -1, y: 0, xT: tt.xT, yT: tt.yT });
      extend.push({ x: -2, y: 0, xT: tt.xT, yT: tt.yT });
      return extend;
    },
  },
  38: {
    extend: function (courseObject) {
      const extend = [];
      extend.push({ x: 0, y: 0, xT: 13, yT: 5 });
      return MonsterDraw._extendForObjects(extend, 3, 2, 14, 4, 1, 1);
    },
  },
  39: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      return MonsterDraw._extendForObjects(extend, 1, 2, 0, 6);
    },
  },
  40: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* blue */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 6, yT: 4 });
      } else {
        /* red */
        extend.push({ x: 0, y: 0, xT: 5, yT: 4 });
      }
      return extend;
    },
  },
  41: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      const stretch = (courseObject.flags & 256) >> 8;
      /* teresa: multiples */
      if (subType) {
        const other = [
          { x: -2, y: -2 },
          { x: -3, y: 0 },
          { x: -2, y: 2 },
          { x: 0, y: 3 },
          { x: 2, y: 2 },
          { x: 3, y: 0 },
          { x: 2, y: -2 },
        ];
        other.forEach(function (element) {
          extend.push({
            x: element.x,
            y: element.y,
            xT: 7,
            yT: 4,
            opacity: 0.3,
          });
        });
      }
      /* stretch */
      if (stretch) {
        extend.push({ x: 0, y: 0, xT: 9, yT: 7 });
      } else {
        /* normal */
        extend.push({ x: 0, y: 0, xT: 7, yT: 4 });
      }
      return extend;
    },
  },
  42: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      if (subType) {
        return MonsterDraw._extendForObjects([], 2, 2, 5, 19);
      }
      return MonsterDraw._extendForObjects([], 2, 2, 2, 6);
    },
  },
  44: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 5 });
      return extend;
    },
  },
  45: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 3, yT: 5 });
      return extend;
    },
  },
  46: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      return MonsterDraw._extendForObjects(extend, 1, 2, 4, 6);
    },
  },
  47: {
    xT: 0,
    yT: 0,
    func: function (courseObject) {
      const subType = courseObject.subType;
      /* red */
      if (subType) {
        return { xT: 5, yT: 6 };
      } else {
        /* black */
        return { xT: 5, yT: 5 };
      }
    },
  },
  48: {
    extend: function (courseObject) {
      let extend = courseObject.extend;
      const subType = courseObject.subType;
      /* + mini */
      extend = subType
        ? MonsterDraw._extendForObjects(extend, 1, 2, 7, 6)
        : /* normal */
          MonsterDraw._extendForObjects(extend, 1, 2, 6, 6);
      return extend;
    },
  },
  50: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 4 });
      return extend;
    },
  },
  51: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 15, yT: 0 });
      return extend;
    },
  },
  52: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const add = 0.2;
      const subType = courseObject.subType;
      extend.push({ x: add, y: -add, xT: 9, yT: 4 });
      /* angry */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 9, yT: 5 });
      } else {
        /* normal */
        extend.push({ x: 0, y: 0, xT: 8, yT: 5 });
      }
      return extend;
    },
  },
  54: {
    extend: function (courseObject) {
      let extend = [];
      extend.push({ x: 0, y: 0, xT: 9, yT: 6 });
      extend = MonsterDraw._extendForObjects(extend, 1, 3, 10, 7, 0, 1);
      return extend;
    },
  },
  55: {
    extend: function (courseObject) {
      const doorType = (courseObject.flags >> 18) & 3;
      /* P door */
      if (doorType === 1) {
        return MonsterDraw._extendForObjects([], 1, 2, 5, 17);
      } else if (doorType === 2) {
        /* key door */
        return MonsterDraw._extendForObjects([], 1, 2, 6, 17);
      }
      /* normal door */
      return MonsterDraw._extendForObjects([], 1, 2, 11, 6);
    },
  },
  56: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* red */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 8, yT: 7 });
      } else {
        /* normal */
        extend.push({ x: 0, y: 0, xT: 8, yT: 6 });
      }
      return extend;
    },
  },
  57: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* red */
      if (subType) {
        extend.push({ x: 0, y: 0, xT: 6, yT: 7 });
      } else {
        /* normal */
        extend.push({ x: 0, y: 0, xT: 7, yT: 7 });
      }
      return extend;
    },
  },
  58: {
    extend: function (courseObject) {
      let extend = courseObject.extend;
      const subType = courseObject.subType;
      /* out */
      extend = subType
        ? MonsterDraw._extendForObjects(extend, 1, 1, 2, 7)
        : /* normal */
          MonsterDraw._extendForObjects(extend, 1, 2, 3, 7);
      return extend;
    },
  },
  60: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      extend.push({ x: 0, y: 0, xT: 1, yT: 7 });
      return extend;
    },
  },
  61: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      /* + wood */
      if (subType) {
        extend.push({ x: 0.3, y: 0.3, xT: 12, yT: 6 });
      }
      extend.push({ x: 0, y: 0, xT: 11, yT: 7 });
      return extend;
    },
  },
  62: {
    extend: function (courseObject) {
      const extend = courseObject.extend;
      const subType = courseObject.subType;
      let xT = 0;
      let yT = 0;
      let size = 1;
      let x = 0;
      /* koopa jr */
      if (subType) {
        size = 2;
        xT = 4;
        yT = 9;
        x = 1;
      } else {
        /* bowser */
        size = 3;
        xT = 2;
        yT = 10;
      }
      /* process the block */
      return MonsterDraw._extendForObjects(extend, size, size, xT, yT, x);
    },
  },
  66: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      /* checkpoint */
      if (subType) {
        return MonsterDraw._extendForObjects([], 2, 2, 9, 19);
      }
      /* air sign */
      return MonsterDraw._extendForObjects([], 2, 2, 14, 7);
    },
  },
  67: {
    extend: function (courseObject) {
      return MonsterDraw._extendForObjects([], 2, 2, 6, 9);
    },
  },
  68: {
    extend: function (courseObject) {
      const subType = courseObject.subType;
      /* checkpoint */
      if (subType) {
        return MonsterDraw._extendForObjects([], 3, 3, 12, 19, 1, 0);
      }
      return MonsterDraw._extendForObjects([], 3, 3, 9, 10, 1, 0);
    },
  },
  69: { xT: 14, xY: 5 },
};
