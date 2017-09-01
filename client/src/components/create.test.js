import {CreateJob} from './create';
import React from 'react';
import {shallow, mount} from 'enzyme';

it('Renders without crashing', () => {
    shallow(<CreateJob />);
});