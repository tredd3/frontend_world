import React from 'react';
import { render } from '@testing-library/react';
import Image from '../Image';

const imageProps = {
  src: 'imageSource.png',
  alt: 'imageSource',
  height: 10,
  width: 10
};

describe('Image Component', () => {
  it('should display the image when provided with resize policy', () => {
    const { getByAltText } = render(<Image
      src={imageProps.src}
      alt={imageProps.alt}
      height={imageProps.height}
      width={imageProps.width}
    />);
    expect(getByAltText(imageProps.alt)).not.toBeFalsy();
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(imageProps.src);
    expect(getByAltText(imageProps.alt).getAttribute('alt')).toEqual(imageProps.alt);
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain('impolicy=resize');
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(`h=${imageProps.height}`);
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(`w=${imageProps.width}`);
  });

  it('should display the image when provided with resizeforheight policy', () => {
    const { getByAltText } = render(<Image
      src={imageProps.src}
      alt={imageProps.alt}
      height={imageProps.height}
    />);
    expect(getByAltText(imageProps.alt)).not.toBeFalsy();
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(imageProps.src);
    expect(getByAltText(imageProps.alt).getAttribute('alt')).toEqual(imageProps.alt);
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain('impolicy=resizeforheight');
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(`h=${imageProps.height}`);
    expect(getByAltText(imageProps.alt).getAttribute('src')).not.toContain(`w=${imageProps.width}`);
  });

  it('should display the image when provided with resizeforwidth policy', () => {
    const { getByAltText } = render(<Image
      src={imageProps.src}
      alt={imageProps.alt}
      width={imageProps.width}
    />);
    expect(getByAltText(imageProps.alt)).not.toBeFalsy();
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(imageProps.src);
    expect(getByAltText(imageProps.alt).getAttribute('alt')).toEqual(imageProps.alt);
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain('impolicy=resizeforwidth');
    expect(getByAltText(imageProps.alt).getAttribute('src')).toContain(`w=${imageProps.width}`);
    expect(getByAltText(imageProps.alt).getAttribute('src')).not.toContain(`h=${imageProps.height}`);
  });

  it('should throw an error when height width are missing', () => {
    expect(() => {
      render(<Image
        src={imageProps.src}
        alt={imageProps.alt}
      />);
    }).toThrowError();
  });
});
