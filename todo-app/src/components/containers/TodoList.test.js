import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import TodoList from './TodoList';

const MOCK_TODO = [{
    id: 'id1',
    text: 'Test 1',
    completed: false
},
    {
        id: 'id2',
        text: 'Test 2',
        completed: true
    }];

describe('Loading TodoList component', () => {
    let mockFnSpy = sinon.spy();

    it('should render nothing when no list items', () => {
        const wrapper = shallow(
            <TodoList toggleTodo={mockFnSpy} />
        );

        const list = wrapper.find('li');
        assert.equal(list.length, 0);
    });

    it('should render Todo list when items are present', () => {
        const wrapper = shallow(
            <TodoList
                toggleTodo={mockFnSpy}
                todos={MOCK_TODO} />
        );

        const list = wrapper.find('li');
        assert.equal(list.length, 2);
        assert.equal(list.at(0).find('input').props().defaultChecked, false);
        assert.equal(list.at(0).find('label').text(), 'Test 1');
        assert.equal(list.at(1).find('input').props().defaultChecked, true);
        assert.equal(list.at(1).find('label').text(), 'Test 2');
    });

    it('should call toggleTodo prop with updated value onclick', () => {
        const MOCK_EVENT = { target: { value: 'id1' } };
        const wrapper = shallow(
            <TodoList
                toggleTodo={mockFnSpy}
                todos={MOCK_TODO} />
        );

        const list = wrapper.find('li');
        assert.equal(list.length, 2);
        assert.equal(list.at(0).find('input').props().defaultChecked, false);
        list.at(0).find('input').props().onClick(MOCK_EVENT);
        assert.equal(mockFnSpy.calledOnce, true);
    });
});
