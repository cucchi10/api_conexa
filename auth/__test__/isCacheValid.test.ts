import { PaginatedResponse } from "../src/interfaces/customPaginate.interface";
import { isCacheValid } from "../src/utils/validations.handle";

describe('Utils', () => {
  describe('isCacheValid', () => {
    it('Se espera un true si es cache es valido', () => {
      const cacheUsers: PaginatedResponse = {
        code: 200,
        message: 'OK',
        success: true,
        data: {
          total: 100,
          per_page: 10,
          current_page: 2,
          last_page: 10,
          from: 11,
          to: 20,
          data: [],
        },
      };
      const page = 2;
      const result = isCacheValid(cacheUsers, page);
      expect(result).toBe(true);
    });

    it('Se espera un false si es cache es invalido', () => {
      const cacheUsers: PaginatedResponse = {
        code: 200,
        message: 'OK',
        success: true,
        data: {
          total: 100,
          per_page: 10,
          current_page: 1,
          last_page: 10,
          from: 11,
          to: 20,
          data: [],
        },
      };
      const page = 2;
      const result = isCacheValid(cacheUsers, page);
      expect(result).toBe(false);
    });

    it('Se espera un false si es cache es null', () => {
      const cacheUsers: PaginatedResponse | null = null;
      const page = 2;
      const result = isCacheValid(cacheUsers, page);
      expect(result).toBe(false);
    });
  });
});