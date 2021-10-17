import Vue from 'vue'
import HelloWorld from '../src/views/helloWorld.vue'

test('HelloWorld Component', () => {
    const cmp = new Vue(HelloWorld).$mount()
    expect(cmp.message).toBe('Vue!')
})
