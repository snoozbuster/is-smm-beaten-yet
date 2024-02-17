/**
 * @module BlockDraw
 * This class draw the blocks from layout/draw/titleset/.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class BlockDraw {
  /**
   * @method module:BlockDraw
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
      size: { M1: 16, M3: 16, MW: 16, WU: 64 },
    }; // pixels
    this._themeSize = this._themeLimit.size[_gameMode];
    this._theme = new Image(
      this._themeSize * this._themeLimit.length.x,
      this._themeSize * this._themeLimit.length.y,
    );
    this._theme.src =
      '/layout/draw/titleset/' + _gameMode + '-' + _gameTheme + '.png';
  }

  /**
   * @method module:BlockDraw::getTheme
   * Return the theme image
   * @access public
   * @return {HTML Element}
   */
  getTheme() {
    return this._theme;
  }

  /**
   * @method module:BlockDraw::getThemeSize
   * Return the theme size
   * @access public
   * @return {Integer}
   */
  getThemeSize() {
    return this._themeSize;
  }

  /**
   * @method module:BlockDraw::getDef
   * Return the block definitions
   * @arg {Integer} _type        Object type
   * @access public
   * @return {Object}
   */
  getDef(_type) {
    return BlockDraw._defitions[_type];
  }

  /**
   * @method module:BlockDraw::hasDraw
   * Check if this type has a draw
   * @arg {Integer} _type        Object type
   * @access public
   * @return {Object}
   */
  hasDraw(_type) {
    return !!this.getDef(_type);
  }

  /**
   * @method module:BlockDraw::_autoComplete3x4
   * Complete tt for extend objects
   * @arg {Object}  tt       Templates position
   * @arg {Integer} limit    How many positions?
   * @static
   * @access private
   * @return {Object}
   */
  static _autoComplete3x4(tt, limit = 12) {
    for (let i = 0; i < limit; i++) {
      if (!tt[i]) {
        tt[i] = { xT: 0, yT: 0 };
      }
    }
    return tt;
  }

  /**
   * @method module:BlockDraw::_extend3x4objects
   * Auxiliar function to extend objects
   * @static
   * @arg {Integer} x            X-axis position
   * @arg {Integer} y            Y-axis position
   * @arg {Integer} width        Object width
   * @arg {Integer} height       Object height
   * @arg {Object}  ttInit       Templates position
   * @access private
   * @return {Array[Object]}
   */
  static _extend3x4objects(x, y, width, height, ttInit) {
    const extend = [];
    const tt = BlockDraw._autoComplete3x4(ttInit);
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        /* top */
        if (h === height - 1 && w === 0) {
          extend.push({ x: w + x, y: h + y, xT: tt[9].xT, yT: tt[9].yT });
        } else if (h === height - 1 && w === width - 1) {
          extend.push({
            x: w + x,
            y: h + y,
            xT: tt[11].xT,
            yT: tt[11].yT,
          });
        } else if (h === height - 1) {
          extend.push({
            x: w + x,
            y: h + y,
            xT: tt[10].xT,
            yT: tt[10].yT,
          });
        } else if (h === 0 && w === 0) {
          /* bottom */
          extend.push({ x: w + x, y: h + y, xT: tt[0].xT, yT: tt[0].yT });
        } else if (h === 0 && w === width - 1) {
          extend.push({ x: w + x, y: h + y, xT: tt[2].xT, yT: tt[2].yT });
        } else if (h === 0) {
          extend.push({ x: w + x, y: h + y, xT: tt[1].xT, yT: tt[1].yT });
        } else if (h % 2 === 1 && w === 0) {
          /* middle-bottom */
          extend.push({ x: w + x, y: h + y, xT: tt[3].xT, yT: tt[3].yT });
        } else if (h % 2 === 1 && w === width - 1) {
          extend.push({ x: w + x, y: h + y, xT: tt[5].xT, yT: tt[5].yT });
        } else if (h % 2 === 1) {
          extend.push({ x: w + x, y: h + y, xT: tt[4].xT, yT: tt[4].yT });
        } else if (h % 2 === 0 && w === 0) {
          /* middle-top */
          extend.push({ x: w + x, y: h + y, xT: tt[6].xT, yT: tt[6].yT });
        } else if (h % 2 === 0 && w === width - 1) {
          extend.push({ x: w + x, y: h + y, xT: tt[8].xT, yT: tt[8].yT });
        } else if (h % 2 === 0) {
          extend.push({ x: w + x, y: h + y, xT: tt[7].xT, yT: tt[7].yT });
        }
      }
    }
    return extend;
  }
}

/**
 * @method module:BlockDraw::_defitions
 * Block Draw Definitions
 * @access private
 */
BlockDraw._defitions = {
  4: { xT: 1, yT: 0 },
  5: { xT: 2, yT: 0 },
  6: { xT: 6, yT: 0 },
  7: {
    extend: function (courseObject) {
      let xT = 8;
      let yT = 11;
      const xMax = 15;
      /* define function to get direction of Terrain */
      for (let i = 0; i < courseObject.extendedData; i++) {
        if (xT === xMax) {
          xT = 0;
          yT++;
        } else {
          xT++;
        }
      }
      const extend = [{ x: 0, y: 0, xT, yT }];
      /* {1} - ghost:lamp */
      if (courseObject.childType === 1) {
        extend.push({ x: 0, y: 2, xT: 1, yT: 1 });
        extend.push({ x: 0, y: 1, xT: 2, yT: 1 });
      } else if (courseObject.childType === 2) {
        /* {2} - ghost:clock */
        extend.push({ x: 0, y: 3, xT: 3, yT: 1 });
        extend.push({ x: 0, y: 2, xT: 4, yT: 1 });
        extend.push({ x: 0, y: 1, xT: 5, yT: 1 });
      } else if (courseObject.childType === 3) {
        /* {3} - ghost:handrail */
        extend.push({ x: 0, y: 1, xT: 13, yT: 8 });
        extend.push({ x: 1, y: 1, xT: 14, yT: 8 });
        extend.push({ x: 2, y: 1, xT: 15, yT: 8 });
      } else if (courseObject.childType === 0) {
        /* {0} - ghost:flower */
        extend.push({ x: 0, y: 1, xT: 0, yT: 1 });
      }
      return extend;
    },
  },
  8: {
    func: function (courseObject) {
      const flags = courseObject.flags;
      /* red coin */
      if ((flags & 4) >> 2) {
        return { xT: 0, yT: 16 };
      }
      /* normal coin */
      return { xT: 7, yT: 0 };
    },
  },
  9: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const height = courseObject.height;
      const direction = courseObject.direction;
      let tt;
      /* {0} right */
      if (direction === 0) {
        tt = {
          0: { xT: 12, yT: 1 },
          1: { xT: 12, yT: 1 },
          2: { xT: 13, yT: 1 },
          9: { xT: 12, yT: 0 },
          10: { xT: 12, yT: 0 },
          11: { xT: 13, yT: 0 },
        };
        return BlockDraw._extend3x4objects(0, -1, height, 2, tt);
      } else if (direction === 1) {
        /* {1} left */
        tt = {
          0: { xT: 11, yT: 1 },
          1: { xT: 12, yT: 1 },
          2: { xT: 12, yT: 1 },
          9: { xT: 11, yT: 0 },
          10: { xT: 12, yT: 0 },
          11: { xT: 12, yT: 0 },
        };
        return BlockDraw._extend3x4objects(-(height - 1), 0, height, 2, tt);
      } else if (direction === 2) {
        /* {2} top */
        tt = {
          0: { xT: 14, yT: 1 },
          2: { xT: 15, yT: 1 },
          3: { xT: 14, yT: 1 },
          5: { xT: 15, yT: 1 },
          6: { xT: 14, yT: 1 },
          8: { xT: 15, yT: 1 },
          9: { xT: 14, yT: 0 },
          11: { xT: 15, yT: 0 },
        };
        return BlockDraw._extend3x4objects(0, 0, 2, height, tt);
      } else {
        /* {3} bottom */
        tt = {
          0: { xT: 14, yT: 2 },
          2: { xT: 15, yT: 2 },
          3: { xT: 14, yT: 1 },
          5: { xT: 15, yT: 1 },
          6: { xT: 14, yT: 1 },
          8: { xT: 15, yT: 1 },
          9: { xT: 14, yT: 1 },
          11: { xT: 15, yT: 1 },
        };
        return BlockDraw._extend3x4objects(-1, -(height - 1), 2, height, tt);
      }
    },
  },
  14: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const height = courseObject.height;
      const color =
        (courseObject.flags >> 18) & 3; /* {0} red , {1} yellow , {2} green */
      /* mushroom head */
      const tt = {
        9: { xT: 3, yT: 2 },
        10: { xT: 4, yT: 2 },
        11: { xT: 5, yT: 2 },
      };
      if (color === 1) {
        /* color {1} */
        tt[9] = { xT: 3, yT: 3 };
        tt[10] = { xT: 4, yT: 3 };
        tt[11] = { xT: 5, yT: 3 };
      } else if (color === 2) {
        /* color {2} */
        tt[9] = { xT: 3, yT: 4 };
        tt[10] = { xT: 4, yT: 4 };
        tt[11] = { xT: 5, yT: 4 };
      }
      const extend = BlockDraw._extend3x4objects(0, height - 1, width, 1, tt);
      /* mushroom body */
      if (width % 2 === 0) {
        for (let h = 0; h < height - 1; h++) {
          const w = width / 2 - 1;
          if (h === 0) {
            extend.push({ x: w, y: h, xT: 6, yT: 2 });
            extend.push({ x: w + 1, y: h, xT: 7, yT: 2 });
          } else {
            extend.push({ x: w, y: h, xT: 6, yT: 1 });
            extend.push({ x: w + 1, y: h, xT: 7, yT: 1 });
          }
        }
      } else {
        for (let h = 0; h < height - 1; h++) {
          const w = (width - 1) / 2;
          if (h === 0) {
            extend.push({ x: w, y: h, xT: 6, yT: 4 });
          } else {
            extend.push({ x: w, y: h, xT: 6, yT: 3 });
          }
        }
      }
      return extend;
    },
  },
  16: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const height = courseObject.height;
      const type = (courseObject.flags >> 18) & 0x3;
      /* {0}:block 1, {1}:block 2, {2}:block 3 */
      const tts = {
        0: {
          0: { xT: 7, yT: 6 },
          1: { xT: 8, yT: 6 },
          2: { xT: 9, yT: 6 },
          3: { xT: 7, yT: 5 },
          4: { xT: 8, yT: 5 },
          5: { xT: 9, yT: 5 },
          6: { xT: 7, yT: 4 },
          7: { xT: 8, yT: 4 },
          8: { xT: 9, yT: 4 },
          9: { xT: 7, yT: 3 },
          10: { xT: 8, yT: 3 },
          11: { xT: 9, yT: 3 },
        },
        1: {
          0: { xT: 10, yT: 6 },
          1: { xT: 11, yT: 6 },
          2: { xT: 12, yT: 6 },
          3: { xT: 10, yT: 5 },
          4: { xT: 11, yT: 5 },
          5: { xT: 12, yT: 5 },
          6: { xT: 10, yT: 4 },
          7: { xT: 11, yT: 4 },
          8: { xT: 12, yT: 4 },
          9: { xT: 10, yT: 3 },
          10: { xT: 11, yT: 3 },
          11: { xT: 12, yT: 3 },
        },
        2: {
          0: { xT: 13, yT: 6 },
          1: { xT: 14, yT: 6 },
          2: { xT: 15, yT: 6 },
          3: { xT: 13, yT: 5 },
          4: { xT: 14, yT: 5 },
          5: { xT: 15, yT: 5 },
          6: { xT: 13, yT: 4 },
          7: { xT: 14, yT: 4 },
          8: { xT: 15, yT: 4 },
          9: { xT: 13, yT: 3 },
          10: { xT: 14, yT: 3 },
          11: { xT: 15, yT: 3 },
        },
      };
      return BlockDraw._extend3x4objects(0, 0, width, height, tts[type]);
    },
  },
  17: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const tt = {
        0: { xT: 0, yT: 3 },
        1: { xT: 1, yT: 3 },
        2: { xT: 2, yT: 3 },
        9: { xT: 0, yT: 2 },
        10: { xT: 1, yT: 2 },
        11: { xT: 2, yT: 2 },
      };
      return BlockDraw._extend3x4objects(0, 0, width, 2, tt);
    },
  },
  21: { xT: 0, yT: 4 },
  22: { xT: 6, yT: 6 },
  23: {
    func: function (courseObject) {
      const type = (courseObject.flags >> 2) & 1;
      /* {1} high jump */
      if (type === 1) {
        return { xT: 6, yT: 5 };
      }
      /* type:{0} jump */
      return { xT: 4, yT: 0 };
    },
  },
  26: {
    extend: function (courseObject) {
      const width = courseObject.width - 3;
      const height = courseObject.height;
      const tt = {
        0: { xT: 11, yT: 8 },
        1: { xT: 12, yT: 8 },
        2: { xT: 12, yT: 8 },
        3: { xT: 11, yT: 8 },
        4: { xT: 12, yT: 8 },
        5: { xT: 12, yT: 8 },
        6: { xT: 11, yT: 8 },
        7: { xT: 12, yT: 8 },
        8: { xT: 12, yT: 8 },
        9: { xT: 11, yT: 7 },
        10: { xT: 12, yT: 7 },
        11: { xT: 12, yT: 7 },
      };
      return BlockDraw._extend3x4objects(0, 0, width, height, tt);
    },
  },
  29: { xT: 3, yT: 0 },
  37: {
    extend: function (courseObject) {
      const width = courseObject.width - 3;
      const height = courseObject.height;
      const tt = {
        0: { xT: 9, yT: 8 },
        1: { xT: 9, yT: 8 },
        2: { xT: 10, yT: 8 },
        3: { xT: 9, yT: 8 },
        4: { xT: 9, yT: 8 },
        5: { xT: 10, yT: 8 },
        6: { xT: 9, yT: 8 },
        7: { xT: 9, yT: 8 },
        8: { xT: 10, yT: 8 },
        9: { xT: 9, yT: 7 },
        10: { xT: 9, yT: 7 },
        11: { xT: 10, yT: 7 },
      };
      return BlockDraw._extend3x4objects(0, 0, width, height, tt);
    },
  },
  43: { xT: 2, yT: 4 },
  49: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const extend = [];
      if (this._gameTheme !== 'castle') {
        return [];
      }
      /* only in "castle" theme */
      for (let x = 0; x < width; x++) {
        extend.push({ x, y: 0, xT: 15, yT: 15 });
      }
      return extend;
    },
  },
  53: {
    extend: function (courseObject) {
      const width = courseObject.width;
      const tt = {
        0: { xT: 8, yT: 0 },
        1: { xT: 9, yT: 0 },
        2: { xT: 10, yT: 0 },
        9: { xT: 8, yT: 0 },
        10: { xT: 9, yT: 0 },
        11: { xT: 10, yT: 0 },
      };
      return BlockDraw._extend3x4objects(0, 0, width, 1, tt);
    },
  },
  59: { xT: 0, yT: 8 } /* not discovered */,
  63: { xT: 8, yT: 7 },
  64: {
    extend: function (courseObject) {
      const height = courseObject.height;
      const extend = [];
      for (let h = 0; h < height; h++) {
        if (h === 0) {
          extend.push({ x: 0, y: h, xT: 13, yT: 7 });
        } else if (h === height - 1) {
          extend.push({ x: 0, y: h, xT: 15, yT: 7 });
        } else {
          extend.push({ x: 0, y: h, xT: 14, yT: 7 });
        }
      }
      return extend;
    },
  },
};
