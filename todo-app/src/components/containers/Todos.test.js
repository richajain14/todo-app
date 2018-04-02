import React from 'react';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Todos from './Todos';

// create any initial state needed
const initialState = {};
const mockStore = configureStore();

describe('Loading Todos component', () => {
    let wrapper, store;
    const mockTodofn = jest.fn();
    const MOCK_TODO = [{
        id: 'id1',
        text: 'Test 1'
    },
        {
            id: 'id2',
            text: 'Test 2'
        }];

    beforeEach(() => {
        // creates the store with any initial state or middleware needed
        store = mockStore({ todos: MOCK_TODO });
        store.dispatch = jest.fn();

        wrapper = shallow(
            <Todos store={store}/>
        );
    });

    it('should render with correct props', () => {
        assert.deepEqual(wrapper.prop('todos'), MOCK_TODO);
    });
});