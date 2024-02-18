import { BlockDraw } from './BlockDraw';
import { BlockObject } from './BlockObject';
import { MonsterDraw } from './MonsterDraw';

/**
 * @module Draw
 * This class draw the course into an HTML Canvas element.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class Draw {
  /**
   * @method module:Draw
   * Constructor of class
   * @arg {String}  _element      HTML element
   * @arg {Integer} _course       Course data
   * @arg {Integer} _objects      Course objects
   * @arg {Integer} _sizeBase     Objects size
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_element, _course, _objects, _sizeBase = 20) {
    /* define element plot */
    this._base = parseFloat(_sizeBase); /* object size 20x20 */
    this._element = _element;
    this._canvas = null;
    this._context = null;
    this._canvasId = `${_element}_courseDraw`;
    /* course definitions */
    this._widthBlock = _course.widthBlock;
    this._heightBlock = _course.heightBlock;
    this._gameMode = _course.mode;
    this._gameTheme = _course.themeName;
    /* theme definitions */
    this._blocks = new BlockDraw(this._gameMode, this._gameTheme);
    this._monsters = new MonsterDraw(this._gameMode, this._gameTheme);
    this._images = [this._blocks.getTheme(), this._monsters.getTheme()];
    /* draw configurations */
    const compare = function (a, b) {
      if (a.z < b.z) {
        return -1;
      }
      if (a.z > b.z) {
        return 1;
      }
      return 0;
    };
    this._objects = _objects.sort(compare); /* order by z-index */
    this._yFix = this._heightBlock * this._base; /* invert y to draw */

    /* call functions */
    this._init();
    this._drawBackground(this._widthBlock, this._heightBlock);
    this._drawObjects(this._objects);
  }

  /**
   * @method module:Draw::_init
   * Init the (HTML) canvas element
   * @access private
   * @return {null}
   */
  _init() {
    /* struct the draw table */
    const html = document.createElement('div');
    html.classList.add('courseDrawMain');
    html.classList.add('relative');
    const canvas = document.createElement('canvas');
    canvas.id = this._canvasId;
    canvas.width = this._widthBlock * this._base;
    canvas.height = this._heightBlock * this._base;
    canvas.append('Your browser does not support the canvas element.');
    /* append elements */
    html.appendChild(canvas);
    document.getElementById(this._element).innerHTML = '';
    document.getElementById(this._element).append(html);
    /* save canvas element */
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    this._context.font = '10px sans-serif';
  }

  /**
   * @method module:Draw::_drawBackground
   * Draw the background
   * @arg {Integer} _x    Width block counting
   * @arg {Integer} _Y    Height block counting
   * @access private
   * @return {null}
   */
  _drawBackground(_X, _Y) {
    const $this = this;
    const bg = new Image($this._base, $this._base);
    bg.onload = function () {
      for (let y = _Y - 1; y >= 0; y--) {
        for (let x = 0; x < _X; x++) {
          $this._context.drawImage(
            bg,
            x * $this._base,
            y * $this._base,
            $this._base,
            $this._base,
          );
        }
      }
    };
    bg.onerror = function () {
      console.error('Draw: Error: squares don"t load.');
    };
    bg.src = '/layout/draw/support/bg-square.png';
  }

  /**
   * @method module:Draw::_drawObjects
   * Draw the objects
   * @arg {Array[Object]} _objects    Array[CourseObject]
   * @access private
   * @return {null}
   */
  _drawObjects(_objects) {
    const $this = this;
    const imageCount = $this._images.length;
    let loadedCount = 0;
    /* onerror event */
    const onerror = function (err) {
      const img = err.target;
      console.error('Draw: Error: theme don"t exists.\n Path: ' + img.src);
    };
    /* allloaded images */
    const allloaded = function () {
      if (loadedCount === imageCount) {
        const semisolids = _objects.filter((obj) => {
          return obj.type === 16;
        });
        const mushroomterrain = _objects.filter((obj) => {
          return obj.type === 14;
        });
        const remainingObjs = _objects.filter((obj) => {
          return obj.type != 16 && obj.type != 14;
        });
        semisolids.forEach(function (courseObject) {
          const type = courseObject.type;
          if ($this._blocks.hasDraw(type)) {
            $this._drawObjectFromTheme($this._blocks, courseObject);
          } else {
            console.log('fault: ' + type);
            $this._drawText(courseObject.x, courseObject.y, type);
          }
        });
        mushroomterrain.forEach(function (courseObject) {
          const type = courseObject.type;
          if ($this._blocks.hasDraw(type)) {
            $this._drawObjectFromTheme($this._blocks, courseObject);
          } else {
            console.log('fault: ' + type);
            $this._drawText(courseObject.x, courseObject.y, type);
          }
        });

        const doorsPipesHash = {
          0: 'A',
          1: 'B',
          2: 'C',
          3: 'D',
          4: 'E',
          5: 'F',
          6: 'G',
          7: 'H',
          8: 'I',
          9: 'J',
        };
        remainingObjs.forEach(function (courseObject) {
          const type = courseObject.type;
          if ($this._blocks.hasDraw(type)) {
            $this._drawObjectFromTheme($this._blocks, courseObject);

            if (
              ![
                BlockObject.codes.Ground,
                BlockObject.codes.HardBlock,
                BlockObject.codes.RengaBlock,
                BlockObject.codes.CastleBridge,
              ].includes(type) &&
              $this._monsters.hasDraw(courseObject.childType)
            ) {
              $this._drawObjectFromTheme(
                $this._monsters,
                {
                  ...courseObject,
                  type: courseObject.childType,
                  extend: [],
                },
                { scale: 0.75, opacity: 0.8 },
              );
            }

            if (type === BlockObject.codes.Dokan) {
              // Pipe Labelling
              let PR = courseObject.pipeLink;
              PR = PR.toString();
              if (PR != '-1') {
                // Real Pipe
                const pipeText = doorsPipesHash[PR];
                $this._drawText(
                  courseObject.x + 0.1,
                  courseObject.y + 0.5,
                  pipeText,
                );
              }
            }
          } else if ($this._monsters.hasDraw(type)) {
            $this._drawObjectFromTheme($this._monsters, courseObject);
            if (type === 55) {
              // Door Labelling
              let PR = courseObject.doorLink;
              PR = PR.toString();
              const doorText = doorsPipesHash[PR];
              $this._drawText(
                courseObject.x + 0.1,
                courseObject.y + 0.5,
                doorText,
              );
            }
          } else {
            console.log('fault: ' + type);
            $this._drawText(courseObject.x, courseObject.y, type);
          }
        });
      }
    };
    /* onload event */
    const onload = function () {
      loadedCount++;
      allloaded();
    };
    /* loading all images */
    $this._images.forEach(function (img) {
      img.onload = onload;
      img.onerror = onerror;
    });
  }

  /**
   * @method module:Draw::_drawText
   * Draw a text
   * @arg {Integer} _x        X-axis
   * @arg {Integer} _y        Y-axis
   * @arg {Integer} text      Text
   * @access private
   * @return {null}
   */
  _drawText(_x, _y, text) {
    const x = _x * this._base;
    const y = this._yFix - _y * this._base;
    this._context.strokeStyle = 'White';
    this._context.lineWidth = 2;
    this._context.strokeText(text, x + 3, y - 3);
    this._context.fillStyle = 'Black';
    this._context.fillText(text, x + 3, y - 3);
  }

  /**
   * @method module:Draw::_drawObjectFromTheme
   * Draw a object from a theme
   * @arg {Object} _theme         BlockDraw, or MonsterDraw
   * @arg {Object} courseObject   CourseObject
   * @access private
   * @return {null}
   */
  _drawObjectFromTheme(_theme, courseObject, paintExt = {}) {
    const $this = this;
    const def = _theme.getDef(courseObject.type);
    const _titleset = _theme.getTheme();
    const _ts = _theme.getThemeSize();
    const _base = $this._base;
    const x = courseObject.x;
    const y = courseObject.y;
    /* multiples cells */
    if (def.extend) {
      const ext = def.extend(courseObject);
      ext.forEach(function (drawExt) {
        const opacity = drawExt.opacity ? drawExt.opacity : null;
        const rotation = drawExt.rotation ? drawExt.rotation : null;
        const objectPaint = {
          titleset: _titleset,
          xT: drawExt.xT,
          yT: drawExt.yT,
          xTs: _ts,
          yTs: _ts,
          x,
          y,
          xExt: drawExt.x,
          yExt: drawExt.y,
          xBase: _base,
          yBase: _base,
          size: courseObject.size,
          width: courseObject.width,
          opacity,
          rotation,
          ...paintExt,
        };
        $this._paintObject(objectPaint);
      });
    } else {
      /* only one cell */
      let xT = def.xT;
      let yT = def.yT;
      if (def.func) {
        const nPos = def.func(courseObject);
        xT = nPos.xT;
        yT = nPos.yT;
      }
      const objectPaint = {
        titleset: _titleset,
        xT,
        yT,
        xTs: _ts,
        yTs: _ts,
        x,
        y,
        xExt: 0,
        yExt: 0,
        xBase: _base,
        yBase: _base,
        size: courseObject.size,
        width: courseObject.width,
        ...paintExt,
      };
      $this._paintObject(objectPaint);
    }
  }

  /**
   * @method module:Draw::_drawObjectFromTheme
   * Draw a object from a theme
   * @arg {Object} _objectPaint
   * @access private
   * @return {null}
   */
  _paintObject(_objectPaint) {
    const _titleset = _objectPaint.titleset;
    const _xT = _objectPaint.xT;
    const _yT = _objectPaint.yT;
    const xTs = _objectPaint.xTs;
    const yTs = _objectPaint.yTs;
    const _x = _objectPaint.x;
    const _y = _objectPaint.y;
    const _xExt = _objectPaint.xExt;
    const _yExt = _objectPaint.yExt;
    const _xBase = _objectPaint.xBase;
    const _yBase = _objectPaint.yBase;
    const _size = _objectPaint.size;
    const _width = _objectPaint.width;
    const _opacity = _objectPaint.opacity;
    const _rotation = _objectPaint.rotation;
    /* processing the data */
    const xT = _xT * xTs;
    const yT = _yT * yTs;
    const x =
      _size === 1
        ? (_x + _xExt) * this._base
        : (_x + _xExt * _size - (2 - Math.ceil(_width / 2))) * this._base;
    const y =
      _size === 1
        ? this._yFix - (_y + _yExt) * this._base - this._base
        : this._yFix - (_y + _yExt * _size + 1) * this._base - this._base;
    const xBase = _xBase * _size * (_objectPaint.scale ?? 1);
    const yBase = _yBase * _size * (_objectPaint.scale ?? 1);
    /* process opacity */
    if (_opacity) {
      this._context.save();
      this._context.globalAlpha = _opacity;
      this._context.drawImage(_titleset, xT, yT, xTs, yTs, x, y, xBase, yBase);
      this._context.restore();
    } else if (_rotation) {
      const degree = (_rotation * Math.PI) / 180;
      const xCenter = xBase / 2.0;
      const yCenter = yBase / 2.0;
      const xRotation = x + xCenter;
      const yRotation = y + yCenter;
      this._context.save();
      this._context.translate(xRotation, yRotation);
      this._context.rotate(degree);
      this._context.drawImage(
        _titleset,
        xT,
        yT,
        xTs,
        yTs,
        -xCenter,
        -yCenter,
        xBase,
        yBase,
      );
      this._context.restore();
    } /* wrong math ----- work only for one block */ else {
      this._context.drawImage(_titleset, xT, yT, xTs, yTs, x, y, xBase, yBase);
    }
  }
}
