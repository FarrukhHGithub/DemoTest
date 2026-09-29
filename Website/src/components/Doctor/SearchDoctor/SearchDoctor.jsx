import React, { useState, useMemo, useCallback } from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useDebounced } from '../../../utils/hooks/useDebounced';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty } from 'antd';
import { Pagination } from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';

const SearchDoctor = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByGender, setSorByGender] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [priceRange, setPriceRange] = useState({});

    const priceDebounced = useDebounced({ searchQuery: priceRange, delay: 600 });
    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 });

    // Memoize query to prevent redundant API queries from RTK Query hook
    const query = useMemo(() => {
        const q = {
            limit: size,
            page,
            sortBy,
            sortOrder,
        };

        if (sortByGender !== '') q.gender = sortByGender;
        if (specialist !== '') q.specialist = specialist;

        if (Object.keys(priceDebounced).length !== 0 && !!priceDebounced) {
            const { min, max } = priceDebounced;
            q.min = min;
            q.max = max;
        }

        if (!!debounced) {
            q.searchTerm = debounced;
        }

        return q;
    }, [size, page, sortBy, sortOrder, sortByGender, specialist, priceDebounced, debounced]);

    const resetFilter = useCallback(() => {
        setPage(1);
        setSize(10);
        setSortOrder("");
        setSearchTerm("");
        setSorByGender("");
        setSpecialist("");
        setPriceRange({});
    }, []);

    const { data, isLoading, isError } = useGetDoctorsQuery(query);
    const doctorsData = data?.doctors;
    const meta = data?.meta;

    // What to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>;
    if (!isLoading && !isError && (!doctorsData || doctorsData.length === 0)) content = <div><Empty /></div>;
    if (!isLoading && !isError && doctorsData && doctorsData.length > 0) {
        content = (
            <>
                {doctorsData.map((item, id) => (
                    <SearchContent key={id + item.id} data={item} />
                ))}
            </>
        );
    }

    const onShowSizeChange = useCallback((current, pageSize) => {
        setPage(1); // Set to page 1 on page size change as standard practice
        setSize(pageSize);
    }, []);

    return (
        <div>
            <Header />
            <SubHeader title='Doctors' subtitle='Lorem ipsum dolor sit amet.' />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setSearchTerm={setSearchTerm}
                            setSorByGender={setSorByGender}
                            setSpecialist={setSpecialist}
                            setPriceRange={setPriceRange}
                            resetFilter={resetFilter}
                            query={query}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.total}
                                    pageSize={size}
                                    current={page}
                                    onChange={(p) => setPage(p)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchDoctor;