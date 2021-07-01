import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './';

describe('Footer component', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should show proper single year in copy text when it is 2021', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 3, 1));

    render(<Footer/>);

    const copy = screen.getByText('© 2021 Woodpecker sp z o.o. All rights reserved');
    expect(copy).toBeVisible();
  });

  it('should show proper range of years in copy text when it is later than 2021', () => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2023, 3, 1));

    render(<Footer/>);

    const copy = screen.getByText('© 2021 - 2023 Woodpecker sp z o.o. All rights reserved');
    expect(copy).toBeVisible();
  });
});
