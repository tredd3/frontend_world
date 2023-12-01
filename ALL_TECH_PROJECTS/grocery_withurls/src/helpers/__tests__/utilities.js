import { updateSelectedFilters, parseQSForFiltersAndSort, parseQSForAppliedFiltersCount } from '../utilities';
import { objectToQueryString } from '../functional';
import mockDB from '../../mocks/db.json';

describe('utilities tests', () => {
  describe('updateSelectedFilters', () => {
    it('should set filters correctly based on updated value', () => {
      expect(updateSelectedFilters({}, { id: 'test', value: '2', checked: true }, true)).toMatchObject({
        test: ['2']
      });

      expect(updateSelectedFilters({}, { id: 'test', value: '2', checked: false }, true)).toBeEmpty();
      expect(updateSelectedFilters({ test: ['3'] }, { id: 'test', value: '2', checked: true }, true)).toMatchObject({
        test: ['3', '2']
      });
      expect(updateSelectedFilters({ test: ['3'], test2: ['3'] }, { id: 'test', value: '3', checked: false }, true)).toMatchObject({
        test2: ['3']
      });
      expect(updateSelectedFilters({ test: ['2'] }, { id: 'test', value: '2', checked: false }, true)).toBeEmpty();
    });

    it('should set filters correctly with multi select enabled', () => {
      const updatedFilters = updateSelectedFilters({}, { id: 'test', value: '2', checked: true }, true);
      expect(updateSelectedFilters(updatedFilters, { id: 'test', value: '3', checked: true }, true)).toMatchObject({
        test: ['2', '3']
      });
    });

    it('should set filters correctly with multi select disabled', () => {
      const updatedFilters = updateSelectedFilters({}, { id: 'test', value: '2', checked: true }, false);
      expect(updateSelectedFilters(updatedFilters, { id: 'test', value: '3', checked: true }, false)).toMatchObject({
        test: ['3']
      });
    });
  });

  describe('parseQSForFiltersAndSort', () => {
    const mockFilters = {
      categoryName: ['bathing soaps', 'body wash'],
      sort: [JSON.stringify({ SP: 'desc' })]
    };
    const mockQueryString = objectToQueryString(mockFilters);

    it('should be able to parse sort and filter params correctly from query string', () => {
      const response = parseQSForFiltersAndSort({}, mockQueryString);
      expect(response).toMatchSnapshot();
    });

    it('should be able to extend base filters with sort and filter params correctly from query string', () => {
      const response = parseQSForFiltersAndSort(
        { categoryId: '1234' },
        mockQueryString
      );
      expect(response).toMatchSnapshot();
    });

    it('should be able to exclude query string keys while parsing for filters and sort params', () => {
      const response = parseQSForFiltersAndSort(
        { categoryId: '1234' },
        mockQueryString,
        ['excludeKey1']
      );
      expect(response).toMatchSnapshot();
    });
  });

  describe('parseQSForAppliedFiltersCount', () => {
    const mockFilters = {
      categoryName: ['bathing soaps', 'body wash'],
      sort: [JSON.stringify({ SP: 'desc' })]
    };
    const mockQueryString = objectToQueryString(mockFilters);

    it('should be able to parse query string to get correct applied filters count', () => {
      expect(parseQSForAppliedFiltersCount(mockDB.search.Data.Filters, mockQueryString)).toBe(3);
    });
  });
});
