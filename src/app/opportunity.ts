export interface SearchCriteria {
  searchType: 'all' | 'byType' | 'byRange' | 'byTypeAndRange' | null;
  byTypeValue: string | null;
  byRangeMin: number | null;
  byRangeMax: number | null;
}

export interface Opportunity {
  id: number;
  name: string;
  type: string;
  subtype?: string;
  openingDate: Date;
  closingDate: Date;
  minInvestmentInK: number;
  numberOfInvestorsRequired: number;
  numberOfInvestorsFilled: number;
}
