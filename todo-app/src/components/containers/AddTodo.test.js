import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import AddTodo from './AddTodo';

describe('Loading AddTodo component', () => {
    let wrapper;
    let mockFnSpy = sinon.spy();
    const MOCK_EVENT = { target: { value: 'New Value' } };

    beforeEach(() => {
        wrapper = shallow(
            <AddTodo
                addTodo={mockFnSpy} />
        );
    });

    it('should render Todo list', () => {
        const input = wrapper.find('input');
        assert.equal(input.length, 1);

        input.props().onChange(MOCK_EVENT);
        assert.equal(wrapper.state('newTask'), 'New Value');
    });

    it('should call addTodo prop with new value onclick', () => {
        const input = wrapper.find('input');
        input.props().onChange(MOCK_EVENT);
        const addBtn = wrapper.find('a');
        assert.equal(addBtn.length, 1);

        addBtn.props().onClick();
        assert.equal(wrapper.state('newTask'), '');
        assert.equal(mockFnSpy.calledOnce, true);
        assert.equal(mockFnSpy.calledWithExactly('New Value'), true);
    });
});
