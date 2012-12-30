var jasmine = require("jasmine-node");

var SandboxedModule = require('sandboxed-module');
var Command = require("commander").Command;

describe("component template", function () {
    var testCommand;
    var Template;
    beforeEach(function() {

        Template = SandboxedModule.require('../../templates/component', {
            requires: {
                '../lib/template-base': {
                    TemplateBase: {}
                }
            }
        }).Template;

        testCommand = new Command();

    });

    it("should have a commandDescription defined on prototype", function () {
        expect(Template.commandDescription).toBeDefined();
    });

    it("should return the command from addOptions", function () {
        expect(Object.create(Template).addOptions(testCommand)).toBe(testCommand);
    });

    describe("command", function () {

        it("should have --name option", function () {
            var command = Object.create(Template).addOptions(testCommand);

            expect(command.optionFor("-n")).toBeDefined();
            expect(command.optionFor("--name")).toBeDefined();
        });

        it("should have --exported-name option", function () {
            var command = Object.create(Template).addOptions(testCommand);

            expect(command.optionFor("-e")).toBeDefined();
            expect(command.optionFor("--exported-name")).toBeDefined();
        });

        it("should have --jsdoc option", function () {
            var command = Object.create(Template).addOptions(testCommand);

            expect(command.optionFor("-j")).toBeDefined();
            expect(command.optionFor("--jsdoc")).toBeDefined();
        });

        it("should have --copyright option", function () {
            var command = Object.create(Template).addOptions(testCommand);

            expect(command.optionFor("-c")).toBeDefined();
            expect(command.optionFor("--copyright")).toBeDefined();
        });
    });

});