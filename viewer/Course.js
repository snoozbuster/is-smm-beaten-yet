/**
 * @module Course
 * This class is a struct for course data.
 *
 * @author Leonardo Mauro <leo.mauro.desenv@gmail.com> (http://leonardomauro.com/)
 * @link https://github.com/leomaurodesenv/smm-course-viewer GitHub
 * @license https://opensource.org/licenses/GPL-3.0 GNU Public License (GPLv3)
 * @copyright 2019 Leonardo Mauro
 * @package smm-course-viewer
 * @access public
 */
export class Course {
  /**
   * @method module:Course
   * Constructor of class
   * @var {Integer} version       SMM version
   * @var {Integer} checksum      File (.cdt) checksum
   * @var {String} year           Creation time (year)
   * @var {String} month          Creation time (month)
   * @var {String} day            Creation time (day)
   * @var {String} hour           Creation time (hour)
   * @var {String} minute         Creation time (minute)
   * @var {String} name           Name
   * @var {String} mode           Mode: "M1", "M3", "MW", "WU"
   * @var {Integer} theme         Theme: 0, 1, 2, 3, 4, 5
   * @var {String} themeName      Theme: "overworld", "underground", "castle", "airship", "water", "ghostHouse"
   * @var {Integer} timeLimit     Time limit
   * @var {Integer} scroll        Scroll: 0, 1, 2, 3
   * @var {Integer} scrollName    Scroll: "none", "slow", "medium", "fast"
   * @var {Integer} flags         Unknow -
   * @var {Integer} width         Width size
   * @var {Integer} widthBlock    Width Blocks count
   * @var {Integer} heightBlock   Height Blocks count
   * @var {Integer} objectCount   Object count
   * @instance
   * @access public
   * @return {this}
   */
  constructor(_objectData) {
    this.version = _objectData.version;
    this.checksum = _objectData.checksum;
    this.year = ('0000' + _objectData.year).slice(-4);
    this.month = ('00' + _objectData.month).slice(-2);
    this.day = ('00' + _objectData.day).slice(-2);
    this.hour = ('00' + _objectData.hour).slice(-2);
    this.minute = ('00' + _objectData.minute).slice(-2);
    this.name = _objectData.name;
    this.mode = _objectData.mode;
    this.theme = _objectData.theme;
    this.themeName = _objectData.themeName;
    this.timeLimit = _objectData.timeLimit;
    this.scroll = _objectData.scroll;
    this.scrollName = _objectData.scrollName;
    // this.flags = _objectData.flags; /* unknown */
    this.width = _objectData.areaWidth;
    this.widthBlock = parseInt(_objectData.areaWidth / 16, 10);
    this.heightBlock = 27;
    // this.hexMiiData = _objectData.hexMiiData; /* unknown */
    this.objectCount = _objectData.objectCount;
  }

  /**
   * @method module:Course::getHtml
   * Return a HTML with course information
   * @access public
   * @return {String}
   */
  getHtml() {
    const toHtml = {
      Name: this.name + ' (' + this.mode + ')',
      Date:
        this.year +
        '/' +
        this.month +
        '/' +
        this.day +
        ' - ' +
        this.hour +
        ':' +
        this.minute,
      Theme: this.themeName + ' (' + this.theme + ')',
      'Game Time': this.timeLimit + 's',
      'Objects Count': this.objectCount,
      Scroll:
        this.scrollName +
        ' (' +
        this.scroll +
        ') over ' +
        this.widthBlock +
        ' blocks',
    };
    let html = '';
    for (const key in toHtml) {
      html += '<b>' + key + '</b>: ' + toHtml[key] + '<br>';
    }
    return html;
  }
}
