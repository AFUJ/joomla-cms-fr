(function () {
  'use strict';

  /**
   * @copyright  (C) 2018 Open Source Matters, Inc. <https://www.joomla.org>
   * @license    GNU General Public License version 2 or later; see LICENSE.txt
   */
  (function (document, Joomla) {
    if (!Joomla || typeof Joomla.Text._ !== 'function') {
      throw new Error('core.js was not properly initialised');
    }

    document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('toolbar-load').addEventListener('click', function () {
        var ids = document.querySelectorAll('input[id*="cb"]:checked');

        if (ids.length === 1) {
          // Add version item id to URL
          var url = document.getElementById('toolbar-load').childNodes[1].getAttribute('data-url') + "&version_id=" + ids[0].value;

          if (window.parent && url) {
            window.parent.location = url;
          }
        } else {
          // @todo use the CE Modal here
          alert(Joomla.Text._('COM_CONTENTHISTORY_BUTTON_SELECT_ONE'));
        }

        return false;
      });
      document.getElementById('toolbar-preview').addEventListener('click', function () {
        var windowSizeArray = ['width=800, height=600, resizable=yes, scrollbars=yes'];
        var ids = document.querySelectorAll('input[id*="cb"]:checked');

        if (ids.length === 1) {
          // Add version item id to URL
          var url = document.getElementById('toolbar-preview').childNodes[1].getAttribute('data-url') + "&version_id=" + ids[0].value;

          if (window.parent && url) {
            window.open(url, '', windowSizeArray.toString());
          }
        } else {
          // @todo use the CE Modal here
          alert(Joomla.Text._('COM_CONTENTHISTORY_BUTTON_SELECT_ONE'));
        }

        return false;
      });
      document.getElementById('toolbar-compare').addEventListener('click', function () {
        var windowSizeArray = ['width=1000, height=600, resizable=yes, scrollbars=yes'];
        var ids = document.querySelectorAll('input[id*="cb"]:checked');

        if (ids.length === 0) {
          // @todo use the CE Modal here
          alert(Joomla.Text._('JLIB_HTML_PLEASE_MAKE_A_SELECTION_FROM_THE_LIST'));
        } else if (ids.length === 2) {
          // Add version item ids to URL
          var url = document.getElementById('toolbar-compare').childNodes[1].getAttribute('data-url') + "&id1=" + ids[0].value + "&id2=" + ids[1].value;

          if (window.parent && url) {
            window.open(url, '', windowSizeArray.toString());
          }
        } else {
          // @todo use the CE Modal here
          alert(Joomla.Text._('COM_CONTENTHISTORY_BUTTON_SELECT_TWO'));
        }

        return false;
      });
    });
  })(document, Joomla);

}());
