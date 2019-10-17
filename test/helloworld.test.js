import Vue from 'vue';
import HelloWorld from '../src/components/HelloWorld.vue';

test('HelloWorld Component', () => {
    const cmp = new Vue(HelloWorld).$mount();
    expect(cmp.message).toBe('Vue!');
});