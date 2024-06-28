import { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import ModalsPortal from '../Modal/ModalsPortal';
import Image from 'next/image';
import SearchIcon from '../../public/icons/search.svg';
import { useTranslations } from '../../hooks/useTranslations';
import { Search } from '../Search';
import { SearchMenuItemMobile } from './ui';

export const SearchBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { t } = useTranslations();

  const handleKeyPress = useCallback(({ ctrlKey, key, keyCode }) => {
    if (ctrlKey && (key === 's' || key === 'S')) {
      setIsSearchModalOpen(true);
    }

    if (keyCode === 27) {
      setIsSearchModalOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <SearchMenuItemMobile handleClick={() => setIsSearchModalOpen(true)}>Wyszukaj</SearchMenuItemMobile>
      <Image src={SearchIcon} alt={'search'} width={32} height={32} onClick={() => setIsSearchModalOpen(true)} className="hidden md:block" />
      <ModalsPortal>
        <Modal 
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          backLabel={t.COMMON.SEARCH.CLOSE}
        >
          <Search onClose={() => setIsSearchModalOpen(false)}/>
        </Modal>
    </ModalsPortal>
    </>
  )
};
