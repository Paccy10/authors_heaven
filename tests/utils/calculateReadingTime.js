import chai from 'chai';
import calculateReadingTime from '../../utils/calculateReadingTime';

chai.should();

describe('Reading Time', () => {
    it('should round up minutes', () => {
        const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type \
            specimen book. It has survived not only five centuries, but also the leap into \
            electronic typesetting, remaining essentially unchanged. It was popularised in \
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
            and more recently with desktop publishing software like Aldus PageMaker including \
            versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type \
            specimen book. It has survived not only five centuries, but also the leap into \
            electronic typesetting, remaining essentially unchanged. It was popularised in \
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
            and more recently with desktop publishing software like Aldus PageMaker including \
            versions of Lorem Ipsum.
            versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type \
            specimen book. It has survived not only five centuries, but also the leap into \
            `;
        const readingTime = calculateReadingTime(text);
        readingTime.should.equal('2 min');
    });
    it('should round down minutes', () => {
        const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type \
            specimen book. It has survived not only five centuries, but also the leap into \
            electronic typesetting, remaining essentially unchanged. It was popularised in \
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
            and more recently with desktop publishing software like Aldus PageMaker including \
            versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
            when an unknown printer took a galley of type and scrambled it to make a type \
            specimen book. It has survived not only five centuries, but also the leap into \
            electronic typesetting, remaining essentially unchanged. It was popularised in \
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, \
            and more recently with desktop publishing software like Aldus PageMaker including \
            versions of Lorem Ipsum.
            `;
        const readingTime = calculateReadingTime(text);
        readingTime.should.equal('1 min');
    });
});
