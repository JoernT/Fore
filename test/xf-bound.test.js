/* eslint-disable no-unused-expressions */
import { html, oneEvent, fixture, fixtureSync, expect, elementUpdated, defineCE } from '@open-wc/testing';

import '../src/xf-form.js';
import '../src/xf-model.js';
import '../src/xf-instance.js';
import '../src/xf-bind.js';
import '../src/ui/xf-output.js';
import '../src/ui/xf-bound.js';

describe('xf-bound tests', () => {

    it('is initialized', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <item>foobar</item>
                                <checked>true</checked>
                            </data>
                            <xf-bind ref="item"></xf-bind>
                            <xf-bind ref="checked"></xf-bind>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound id="input1" ref="item" update-event="blur" value-prop="value">
                            <label slot="label">with onblur handler</label>
                            <input id="control" name="value" value="">
                        </xf-bound>
                
                    </xf-group>
                </xf-form>
            `)
        );

        await elementUpdated(el);
        const bound = el.querySelector('#input1');
        expect(bound).to.exist;

        const control = document.getElementById('control');
        expect(bound.control).to.equal(control);

    });

    it('is creates a default input', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <item>foobar</item>
                                <checked>true</checked>
                            </data>
                            <xf-bind ref="item"></xf-bind>
                            <xf-bind ref="checked"></xf-bind>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound id="input1" ref="item">
                            <label slot="label">with onblur handler</label>
                        </xf-bound>
                
                    </xf-group>
                </xf-form>
            `)
        );

        await elementUpdated(el);
        const bound = el.querySelector('#input1');
        expect(bound).to.exist;

        const input = bound.control;
        expect(input).to.exist;

    });

    it('is initialized', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <item>foobar</item>
                                <checked>true</checked>
                            </data>
                            <xf-bind ref="item"></xf-bind>
                            <xf-bind ref="checked"></xf-bind>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound id="input1" ref="item" update-event="blur" value-prop="value">
                            <label slot="label">with onblur handler</label>
                            <input name="value" value="">
                        </xf-bound>
                
                    </xf-group>
                </xf-form>
            `)
        );

        await elementUpdated(el);
        const bound = el.querySelector('#input1');
        expect(bound).to.exist;

    });

    it('it updates when update event fires', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <item>foobar</item>
                                <checked>true</checked>
                            </data>
                            <xf-bind ref="item"></xf-bind>
                            <xf-bind ref="checked"></xf-bind>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound id="input1" ref="item" update-event="blur" value-prop="value">
                            <label slot="label">with onblur handler</label>
                            <input id="input1" name="value" value="">
                        </xf-bound>
                
                    </xf-group>
                    <xf-setvalue event="refresh-done" ref="item"">foo</xf-setvalue>
                </xf-form>
            `)
        );

        // await elementUpdated(el);

        const bound = el.querySelector('#input1');
        expect(bound).to.exist;


        const i1 = document.getElementById('input1');
        i1.value = "foo";
        i1.blur();
        expect(i1.value).to.equal('foo');



    });

    it('initialzes native select', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model>
                        <xf-instance>
                            <data>
                                <listitem>foo</listitem>
                            </data>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound ref="listitem" update-event="change">
                            <label slot="label">native select</label>
                            <select>
                                <option value=""></option>
                                <option value="foo">foo</option>
                                <option value="bar">bar</option>
                            <select>
                        </xf-bound>
                    </xf-group>
                </xf-form>
            `)
        );

        // await elementUpdated(el);

        const bound = el.querySelector('xf-bound');
        expect(bound).to.exist;
        expect(bound.valueProp).to.equal('value');
        expect(bound[bound.valueProp]).to.equal('foo');

        const select = el.querySelector('select');
        expect(select).to.exist;
        console.log('select value ', select.value);
        expect(select.value).to.equal('foo');



    });

/*
    it('is initialized', async () => {
        const el =  (
            await fixture(html`
                <xf-form>
                    <xf-model id="model1">
                        <xf-instance>
                            <data>
                                <item>foobar</item>
                                <checked>true</checked>
                            </data>
                            <xf-bind ref="item"></xf-bind>
                            <xf-bind ref="checked"></xf-bind>
                        </xf-instance>
                    </xf-model>
                    <xf-group>
                        <xf-bound id="input1" ref="item" update-event="blur" value-prop="value">
                            <label slot="label">with onblur handler</label>
                            <input name="value" value="">
                        </xf-bound>

                        <xf-bound id="input2" ref="item" update-event="input">
                            <label slot="label">with incremental handler</label>
                            <input name="value" value="">
                        </xf-bound>

                        <xf-bound id="input3" ref="checked" update-event="input" value-prop="checked">
                            <label slot="label">with incremental handler</label>
                            <input name="value" type="checkbox">
                        </xf-bound>
                    </xf-group>
                </xf-form>
            `)
        );

        await elementUpdated(el);

        expect(bind).to.exist;

    });
*/




});