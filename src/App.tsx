import { useEffect, useState } from "react";
import { EstimateData, Section } from "./types/app";
import { Spinner } from "./components/UI/spinner";
import EstimateHeader from "./components/estimateHeader";
import EstimateSection from "./components/estimateSection";
import "./styles/app.scss";
import Loader from "./components/UI/loader";

const ITEM_PER_PAGE = 10;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageLoader, setPageLoader] = useState(false);

  const totalItems = page * ITEM_PER_PAGE;

  const handleLoadData = () => {
    setPageLoader(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setPageLoader(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setEstimateData(data);

        if (data && data.data && data.data.sections) {
          calculateGrandTotal(data.data.sections);
        }
      } catch (error) {
        console.error("Error fetching estimate data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateGrandTotal = (sections: Section[]) => {
    let total = 0;
    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.quantity && item.unit_cost) {
          const qty = Number.parseFloat(item.quantity) || 0;
          const unitCost = Number.parseFloat(item.unit_cost) / 100 || 0;
          total += qty * unitCost;
        }
      });
    });
    setGrandTotal(total);
  };

  const handleItemUpdate = (
    sectionId: string,
    itemId: string,
    field: "quantity" | "unit_cost",
    value: string
  ) => {
    if (!estimateData) return;

    const isNumber = !Number.isNaN(value);

    if (isNumber && Number(value) < 0) return;

    const updatedSections = estimateData.data.sections.map((section) => {
      if (section.section_id === sectionId) {
        const updatedItems = section.items.map((item) => {
          if (item.item_id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...section, items: updatedItems };
      }
      return section;
    });

    const updatedData = {
      ...estimateData,
      data: {
        ...estimateData.data,
        sections: updatedSections,
      },
    };

    setEstimateData(updatedData);
    calculateGrandTotal(updatedSections);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner />
        <span>Loading estimate data...</span>
      </div>
    );
  }

  if (!estimateData) {
    return <div className="error-message">Failed to load estimate data.</div>;
  }

  return (
    <main className="main-container">
      <EstimateHeader grandTotal={grandTotal} />

      <div className="sections-container">
        {estimateData.data.sections.slice(0, totalItems).map((section) => (
          <EstimateSection
            key={section.section_id}
            section={section}
            onItemUpdate={handleItemUpdate}
          />
        ))}
      </div>

      {pageLoader && <Loader />}

      {!pageLoader && estimateData.data.sections.length > totalItems && (
        <button
          className="view-more-button"
          type="button"
          onClick={handleLoadData}
        >
          View More {estimateData.data.sections.length - totalItems} Items
        </button>
      )}
    </main>
  );
};

export default App;
