import { render } from '@testing-library/react';

import MiuracImage from './miurac-image';

describe('MiuracImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MiuracImage />);
    expect(baseElement).toBeTruthy();
  });
});
