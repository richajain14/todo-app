import React from 'react';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import App from './App';

describe('Loading App component', () => {
    it('should render Todos component', () => {
        const wrapper = shallow(<App />);
        assert.equal(wrapper.find('Connect(Todos)').length, 1);
    });
});
