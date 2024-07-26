import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from '../../hooks/useTranslations'
import InputWrapper from '../InputWrapper';
import { ResultsMessage, ResultsWrapper, Tip } from './ui'
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchResultItem } from '../SearchResultItem';

type SearchResults = {
  data: any[];
  total: {
    articles: number;
    podcasts: number;
    total: number;
  };
}

export const Search = ({ onClose }) => {
  const { t, translate } = useTranslations();
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [searchValue, setSearchValue] = useState<string>();
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const { push } = useRouter();

  const handleGoto = async (e, url: string) => {
    e.preventDefault();
    
    await push(url);
    await onClose();
  }

  const onSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResults(null);
    setIsSearching(true);
    setSearchValue(e.target?.value);
    
    try {
      const response = await fetch(`/api/search/search?q=${e.target?.value}`);
      const data = await response.json();
  
      setSearchResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  }, 400);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <div>
      <Tip>{t.COMMON.SEARCH.TIP}</Tip>
      <InputWrapper error={null}>
        <input
          type="text"
          placeholder={t.COMMON.SEARCH.PLACEHOLDER}
          onChange={onSearch}
          ref={searchInputRef}
        />
      </InputWrapper>
      {isSearching && <ResultsMessage>{t.COMMON.SEARCH.LOADING}</ResultsMessage>}
      {(searchResults && searchResults.data?.length > 0) && (
        <ResultsWrapper>
          {searchResults?.total?.total && <ResultsMessage>{searchResults?.total?.total} wyników wyszukiwania dla: {searchValue}</ResultsMessage>}
          <ul>
            {searchResults.data.map((item, i, arr) => <li key={item.slug}>
              <SearchResultItem
                handleClick={(e: SyntheticEvent) => { handleGoto(e, `/${item.type}/${item.slug}`); }}
                title={item.title}
                isLast={arr.length - 1 === i}
              />
            </li>)}
          </ul>
        </ResultsWrapper>
      )}
      {searchResults && searchResults.data?.length === 0 && <ResultsMessage>
        {translate({ value: t.COMMON.SEARCH.NO_RESULTS, variables: [searchValue]})}
      </ResultsMessage>}
    </div>
  )
}
