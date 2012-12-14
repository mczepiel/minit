/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */

var TemplateBase = require("../lib/template-base.js").TemplateBase;
var path = require("path");
var exec = require('child_process').exec;
var fs = require('fs');

exports.Template = Object.create(TemplateBase, {

    usage: {
        value: function() {
            return TemplateBase.usage.apply(this, arguments) + " [copyright file]";
        }
    },

    commandDescription: {
        value: "application"
    },

    addOptions: {
        value:function (command) {
            command.option('-c, --copyright [path]', 'copyright file', function(path) {
                return fs.readFileSync(path, "utf-8");
            });
            return command;
        }
    },

    finish: {
        value: function() {
            return TemplateBase.finish.call(this).then(function(result) {
                // TODO: Do something automatically
                // This is nowhere near the most user friendly way of adding Montage
                // to the user's app. We could init a Git repo and submodule it
                // for them, but that might be a bit presumptuous. To think about.
                console.log("* Install Montage from npm:");
                console.log("npm install .");
                console.log();
                return result;
            });

        }
    }

});