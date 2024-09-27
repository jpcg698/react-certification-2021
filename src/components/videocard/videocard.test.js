import { render, screen } from '@testing-library/react';
import VideoCard from './videocard';
import yt from "../../data/yt"

test('Renders card correctly', () => {

    const Videos = render(<VideoCard 
        thumbnail={yt.items[1].snippet.thumbnails.high.url} 
        title={yt.items[1].snippet.title} url={yt.items[1].id.videoId} 
        description={yt.items[1].snippet.description}
        kind={yt.items[1].id.kind}
        />);

    expect(Videos).toMatchSnapshot();
  });
  