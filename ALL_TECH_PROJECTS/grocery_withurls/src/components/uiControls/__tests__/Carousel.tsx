import React from 'react';
import { render } from '@testing-library/react';
import Carousel from '../Carousel';

const mockItems = [1, 2, 3, 4];
const renderItem = (item: number) => (
  <div>{item}</div>
);

describe('Carousel tests', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Element.prototype.scrollTo = () => {};
  });

  it('should render the component without carousel markers correctly', async () => {
    const { asFragment } = render(
      <Carousel>
        {mockItems.map(renderItem)}
      </Carousel>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the component with carousel markers', () => {
    const { asFragment } = render(
      <Carousel enableDots>
        {mockItems.map(renderItem)}
      </Carousel>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
