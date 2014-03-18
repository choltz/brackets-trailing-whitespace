/*
 * The MIT License (MIT)
 * Copyright (c) 2013 Lance Campbell. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*jslint vars: true, plusplus: true, devel: true, regexp: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

/*
 * Create a toggle menu item ans save the value to the preference manager.
 * This is an attempt to isolate this concern and to keep a simple interface.
 */
define(function (require, exports, module) {
    "use strict";

    // Modules
    var PreferencesManager  = brackets.getModule("preferences/PreferencesManager"),
        CommandManager      = brackets.getModule("command/CommandManager");
    
    var _prefs = PreferencesManager.stateManager.getPrefixedSystem("persistent_whitespace");
    
    // Function declarations
    var createPersistentMenuItem, _configureMenu, _setMenuCheckedValue, _toggleSetting;
    
    //
    // Public functions
    //
    
    createPersistentMenuItem = function (menuText, commandId) {
        _configureMenu(menuText, commandId);
        _setMenuCheckedValue(commandId, _prefs.get(commandId + '_enabled'));
    };

    //
    // Private functions
    //
    
    _configureMenu = function (menuText, commandId) {
        var Menus               = brackets.getModule("command/Menus");

        CommandManager.register(menuText, commandId, _toggleSetting);
        Menus.getMenu(Menus.AppMenuBar.VIEW_MENU).addMenuItem(commandId);
    };
    
    _setMenuCheckedValue = function (commandId, value) {
        var command = CommandManager.get(commandId);

        command.setChecked(value);
        _prefs.set(commandId + '_enabled', value);
    };
    
    _toggleSetting = function () {
        var commandId = this._id;
        _setMenuCheckedValue(commandId, !_prefs.get(commandId + '_enabled'));
    };

    exports.createPersistentMenuItem = createPersistentMenuItem;
});
