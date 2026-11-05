import React, { useState, useMemo, useEffect } from 'react';
import { 
  Truck, 
  Fuel, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  Calculator, 
  BarChart3, 
  User, 
  X,
  LayoutDashboard,
  HardHat,
  Droplet,
  Calendar,
  Clock,
  History,
  PlusCircle,
  RotateCcw
} from 'lucide-react';

// Pre-loaded dataset from ML Machinery Master Control document
const initialMachineryData = [
  { id: 1, no: 1, size: 'G', type: 'អាប៊ុល (Bulldozer)', code: 'BUL 01', driver: 'T1', qty: 1, standardHour: 7, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 2, no: 2, size: 'G', type: 'អាបិល (Bulldozer)', code: 'BUL 02', driver: 'No', qty: 1, standardHour: 7, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 3, no: 3, size: '-', type: 'ឡានស្ទូច (Crane Truck)', code: 'CRT_01', driver: 'T6', qty: 1, standardHour: 15, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 4, no: 4, size: 'ធំ', type: 'ឡានស្ទូច (Crane Truck)', code: 'CRT 02', driver: 'T8', qty: 1, standardHour: 13, managedBy: 'អឿន សម្បត្តិ', project: 'GA' },
  { id: 5, no: 5, size: 'ធំ', type: 'ឡានស្ទូច (Crane Truck)', code: 'CRT 03', driver: 'T11', qty: 1, standardHour: 15, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 6, no: 6, size: 'ធំ', type: 'ឡានស្ទូច (Crane Truck)', code: 'CRT 04', driver: 'T13', qty: 1, standardHour: 13, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 7, no: 7, size: 'ធំ', type: 'ឡានស្ទូច (Crane Truck)', code: 'CRT 05', driver: 'T15', qty: 1, standardHour: 7, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 8, no: 8, size: 'ធំ', type: 'ឡានបែន (Dump Truck)', code: 'DUT 01', driver: 'T7', qty: 1, standardHour: 13, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 9, no: 9, size: '-', type: 'ឡានទឹក (Water Truck)', code: 'DUT 02', driver: 'T9', qty: 1, standardHour: 8, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 10, no: 10, size: '-', type: 'ឡានបែន (Dump Truck)', code: 'DUT 03', driver: 'No', qty: 1, standardHour: 8, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 11, no: 11, size: 'តូច', type: 'ឡានបែន (Dump Truck)', code: 'DUT 04', driver: 'No', qty: 1, standardHour: 8, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 12, no: 12, size: '-', type: 'អេស្កាវ៉ាទ័រ (Excavator)', code: 'EXC 01', driver: 'T4', qty: 1, standardHour: 26, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 13, no: 13, size: 'i', type: 'អេស្កាវ៉ាទ័រ (Excavator)', code: 'EXC 02', driver: 'T12', qty: 1, standardHour: 20, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 14, no: 14, size: 'ធំ', type: 'អេស្កាវ៉ាទ័រ (Excavator)', code: 'EXC 03', driver: 'T15', qty: 1, standardHour: 20, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 15, no: 15, size: 'តូច', type: 'អេស្កាវ៉ាទ័រ (Excavator)', code: 'EXC 04', driver: 'T14', qty: 1, standardHour: 2, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 16, no: 16, size: '-', type: 'អេស្កាវ៉ាទ័រ (Excavator)', code: 'EXC 05', driver: 'No', qty: 1, standardHour: 2, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 17, no: 17, size: '-', type: 'ហូតលីប (Forklift)', code: 'FOR 01', driver: 'No', qty: 1, standardHour: 4, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 18, no: 18, size: 'ធំ', type: 'ឡ (Road Roller)', code: 'ROL 01', driver: 'T16', qty: 1, standardHour: 19, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 19, no: 19, size: 'ធំ', type: 'សាស័រ (Wheel Loader)', code: 'SAS 01', driver: 'T3', qty: 1, standardHour: 21, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 20, no: 20, size: 'ធំ', type: 'សាស័រ (Wheel Loader)', code: 'SAS 02', driver: 'T5', qty: 1, standardHour: 21, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 21, no: 21, size: 'ធំ', type: 'សាស័រ (Wheel Loader)', code: 'SAS 03', driver: 'T2', qty: 1, standardHour: 21, managedBy: 'អឿន សម្បត្តិ', project: 'GA' },
  { id: 22, no: 22, size: '-', type: 'ត្រាក់ទ័រ (Tractor)', code: 'TRT 01', driver: 'T10', qty: 1, standardHour: 4, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 23, no: 23, size: 'តូច', type: 'ត្រាក់ទ័រ (Tractor)', code: 'TRT 02', driver: 'No', qty: 1, standardHour: 3, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
  { id: 24, no: 27, size: 'តូច', type: 'ត្រាក់ទ័រ (Tractor)', code: 'TRT 03', driver: 'No', qty: 1, standardHour: 3, managedBy: 'អឿន សម្បត្តិ', project: 'MC' },
];

// Initial sample refuel history logs
const initialRefuelLogs = [
  {
    id: 101,
    date: new Date().toISOString().slice(0, 10),
    time: '07:30',
    code: 'BUL 01',
    type: 'អាប៊ុល (Bulldozer)',
    size: 'G',
    driver: 'T1',
    managedBy: 'អឿន សម្បត្តិ',
    project: 'MC',
    liters: 56,
    notes: 'Morning full refuel'
  },
  {
    id: 102,
    date: new Date().toISOString().slice(0, 10),
    time: '08:15',
    code: 'EXC 01',
    type: 'អេស្កាវ៉ាទ័រ (Excavator)',
    size: '-',
    driver: 'T4',
    managedBy: 'អឿន សម្បត្តិ',
    project: 'MC',
    liters: 150,
    notes: 'Shift start refuel'
  },
  {
    id: 103,
    date: new Date().toISOString().slice(0, 10),
    time: '09:00',
    code: 'CRT 02',
    type: 'ឡានស្ទូច (Crane Truck)',
    size: 'ធំ',
    driver: 'T8',
    managedBy: 'អឿន សម្បត្តិ',
    project: 'GA',
    liters: 100,
    notes: 'Site GA dispatch'
  }
];

export default function App() {
  // Load initial data from localStorage if available
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('ml_machinery_data');
      return saved ? JSON.parse(saved) : initialMachineryData;
    } catch (e) {
      return initialMachineryData;
    }
  });

  const [refuelLogs, setRefuelLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('ml_refuel_logs');
      return saved ? JSON.parse(saved) : initialRefuelLogs;
    } catch (e) {
      return initialRefuelLogs;
    }
  });

  // Sync state to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem('ml_machinery_data', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save machinery data to localStorage", e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem('ml_refuel_logs', JSON.stringify(refuelLogs));
    } catch (e) {
      console.error("Failed to save refuel logs to localStorage", e);
    }
  }, [refuelLogs]);

  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'refuel', 'simulator', 'analytics'
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isRefuelModalOpen, setIsRefuelModalOpen] = useState(false);
  const [editingRefuelLog, setEditingRefuelLog] = useState(null);

  // Custom Delete Confirmation Modal State
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    type: null, // 'refuel' or 'fleet'
    id: null,
    title: ''
  });

  // Custom "Other Car" mode toggle inside Refuel modal
  const [isCustomRefuel, setIsCustomRefuel] = useState(false);
  const [saveCustomToFleet, setSaveCustomToFleet] = useState(false);

  // Refuel Form state
  const [refuelFormData, setRefuelFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    code: 'BUL 01',
    type: 'អាប៊ុល (Bulldozer)',
    size: 'G',
    driver: 'T1',
    managedBy: 'អឿន សម្បត្តិ',
    project: 'MC',
    liters: 56,
    notes: ''
  });

  // Simulator state
  const [calcCode, setCalcCode] = useState('BUL 01');
  const [calcHours, setCalcHours] = useState(8);
  const [calcDays, setCalcDays] = useState(1);

  // Machinery Form state
  const [formData, setFormData] = useState({
    no: '',
    size: 'ធំ',
    type: 'អាប៊ុល (Bulldozer)',
    code: '',
    driver: 'No',
    qty: 1,
    standardHour: 10,
    managedBy: 'អឿន សម្បត្តិ',
    project: 'MC'
  });

  // Reset Data to Original Factory Defaults
  const handleResetDefaults = () => {
    if (window.confirm('Reset all fleet data and refuel logs to default state?')) {
      setData(initialMachineryData);
      setRefuelLogs(initialRefuelLogs);
      localStorage.removeItem('ml_machinery_data');
      localStorage.removeItem('ml_refuel_logs');
    }
  };

  // Handle auto-populating machine specs when Machine Code is selected in Refuel Modal
  const handleRefuelCodeSelect = (selectedCode) => {
    if (selectedCode === 'OTHER_CUSTOM') {
      setIsCustomRefuel(true);
      setRefuelFormData(prev => ({
        ...prev,
        code: 'CAR-NEW',
        type: 'ឡាន / គ្រឿងចក្រផ្សេងៗ (Other Car)',
        size: 'ធំ',
        driver: 'T-Custom',
        managedBy: 'អឿន សម្បត្តិ',
        project: 'MC',
        liters: 50
      }));
      return;
    }

    setIsCustomRefuel(false);
    const matchedMachine = data.find(m => m.code === selectedCode);
    if (matchedMachine) {
      setRefuelFormData(prev => ({
        ...prev,
        code: matchedMachine.code,
        type: matchedMachine.type,
        size: matchedMachine.size,
        driver: matchedMachine.driver !== 'No' ? matchedMachine.driver : 'No',
        managedBy: matchedMachine.managedBy,
        project: matchedMachine.project,
        liters: matchedMachine.standardHour * 8
      }));
    } else {
      setRefuelFormData(prev => ({ ...prev, code: selectedCode }));
    }
  };

  // Open Refuel Modal (Add/Edit)
  const handleOpenRefuelModal = (log = null) => {
    if (log) {
      setEditingRefuelLog(log);
      setIsCustomRefuel(false);
      setSaveCustomToFleet(false);
      setRefuelFormData({ ...log });
    } else {
      setEditingRefuelLog(null);
      setIsCustomRefuel(false);
      setSaveCustomToFleet(false);
      const defaultCode = data[0]?.code || 'BUL 01';
      const matchedMachine = data.find(m => m.code === defaultCode);
      setRefuelFormData({
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toTimeString().slice(0, 5),
        code: defaultCode,
        type: matchedMachine ? matchedMachine.type : 'អាប៊ុល (Bulldozer)',
        size: matchedMachine ? matchedMachine.size : 'G',
        driver: matchedMachine ? matchedMachine.driver : 'T1',
        managedBy: matchedMachine ? matchedMachine.managedBy : 'អឿន សម្បត្តិ',
        project: matchedMachine ? matchedMachine.project : 'MC',
        liters: matchedMachine ? matchedMachine.standardHour * 8 : 50,
        notes: ''
      });
    }
    setIsRefuelModalOpen(true);
  };

  // Save Refuel Entry
  const handleSaveRefuelLog = (e) => {
    e.preventDefault();

    // If "Save to Fleet" checkbox was enabled for custom car
    if (isCustomRefuel && saveCustomToFleet) {
      const existing = data.find(m => m.code.toLowerCase() === refuelFormData.code.toLowerCase());
      if (!existing) {
        const nextNo = data.length > 0 ? Math.max(...data.map(d => Number(d.no) || 0)) + 1 : 1;
        const newMachine = {
          id: Date.now(),
          no: nextNo,
          size: refuelFormData.size || 'ធំ',
          type: refuelFormData.type || 'Other Vehicle',
          code: refuelFormData.code,
          driver: refuelFormData.driver || 'No',
          qty: 1,
          standardHour: Math.round(Number(refuelFormData.liters) / 8) || 5,
          managedBy: refuelFormData.managedBy || 'អឿន សម្បត្តិ',
          project: refuelFormData.project || 'MC'
        };
        setData(prev => [...prev, newMachine]);
      }
    }

    if (editingRefuelLog) {
      setRefuelLogs(prevLogs => prevLogs.map(item => String(item.id) === String(editingRefuelLog.id) ? { ...refuelFormData, id: editingRefuelLog.id, liters: Number(refuelFormData.liters) } : item));
    } else {
      const newEntry = {
        ...refuelFormData,
        id: Date.now(),
        liters: Number(refuelFormData.liters)
      };
      setRefuelLogs(prevLogs => [newEntry, ...prevLogs]);
    }
    setIsRefuelModalOpen(false);
  };

  // Open Delete Confirmation Dialog
  const triggerDeleteConfirm = (type, id, title = '') => {
    setDeleteConfirmModal({
      isOpen: true,
      type,
      id,
      title
    });
  };

  // Execute Confirmed Delete Operation
  const handleExecuteDelete = () => {
    const { type, id } = deleteConfirmModal;
    if (type === 'refuel') {
      setRefuelLogs(prevLogs => prevLogs.filter(item => String(item.id) !== String(id)));
    } else if (type === 'fleet') {
      setData(prevData => prevData.filter(item => String(item.id) !== String(id)));
    }
    setDeleteConfirmModal({ isOpen: false, type: null, id: null, title: '' });
  };

  // Filtered dataset for master table
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.managedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProject = projectFilter === 'ALL' || item.project === projectFilter;
      
      return matchesSearch && matchesProject;
    });
  }, [data, searchTerm, projectFilter]);

  // Filtered dataset for Refuel History logs
  const filteredRefuelLogs = useMemo(() => {
    return refuelLogs.filter(log => {
      const matchesSearch = 
        log.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.managedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.date.includes(searchTerm);

      const matchesProject = projectFilter === 'ALL' || log.project === projectFilter;

      return matchesSearch && matchesProject;
    });
  }, [refuelLogs, searchTerm, projectFilter]);

  // Calculated Metrics
  const metrics = useMemo(() => {
    const totalCount = data.reduce((acc, curr) => acc + Number(curr.qty), 0);
    const totalDailyFuel = data.reduce((acc, curr) => acc + (Number(curr.standardHour) * 8 * Number(curr.qty)), 0);
    
    const projectMC = data.filter(d => d.project === 'MC');
    const projectGA = data.filter(d => d.project === 'GA');
    
    const fuelMC = projectMC.reduce((acc, curr) => acc + (Number(curr.standardHour) * 8), 0);
    const fuelGA = projectGA.reduce((acc, curr) => acc + (Number(curr.standardHour) * 8), 0);
    
    const assignedDrivers = data.filter(d => d.driver !== 'No').length;

    // Refuel Specific Stats
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayRefuelTotal = refuelLogs
      .filter(l => l.date === todayStr)
      .reduce((acc, curr) => acc + Number(curr.liters || 0), 0);

    const totalRefuelLifetime = refuelLogs.reduce((acc, curr) => acc + Number(curr.liters || 0), 0);

    return {
      totalCount,
      totalDailyFuel,
      mcCount: projectMC.length,
      gaCount: projectGA.length,
      fuelMC,
      fuelGA,
      assignedDrivers,
      todayRefuelTotal,
      totalRefuelLifetime,
      totalRefuelEntries: refuelLogs.length
    };
  }, [data, refuelLogs]);

  // Handle Form Input Change for Machinery
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'standardHour' || name === 'qty' || name === 'no' ? Number(value) : value
    }));
  };

  // Open Modal for Machinery Add/Edit
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      const nextNo = data.length > 0 ? Math.max(...data.map(d => Number(d.no) || 0)) + 1 : 1;
      setFormData({
        no: nextNo,
        size: 'ធំ',
        type: 'អាប៊ុល (Bulldozer)',
        code: `NEW ${nextNo}`,
        driver: 'No',
        qty: 1,
        standardHour: 10,
        managedBy: 'អឿន សម្បត្តិ',
        project: 'MC'
      });
    }
    setIsModalOpen(true);
  };

  // Save Vehicle Record
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      setData(prevData => prevData.map(item => String(item.id) === String(editingItem.id) ? { ...formData, id: editingItem.id } : item));
    } else {
      setData(prevData => [...prevData, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Export Refuel History to CSV
  const handleExportRefuelCSV = () => {
    const headers = ["Date,Time,Vehicle Code,Type,Size,Driver,Managed By,Project,Diesel Liters Refueled,Notes\n"];
    const rows = filteredRefuelLogs.map(log => 
      `"${log.date}","${log.time}","${log.code}","${log.type}","${log.size}","${log.driver}","${log.managedBy}","${log.project}",${log.liters},"${log.notes || ''}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Daily_Diesel_Refuel_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Master Fleet to CSV
  const handleExportFleetCSV = () => {
    const headers = ["No,Size,Machinery Type,Code,Driver,Qty,Std Liters/Hour,Liters/8 Hours,Managed By,Project\n"];
    const rows = filteredData.map(item => 
      `${item.no},"${item.size}","${item.type}","${item.code}","${item.driver}",${item.qty},${item.standardHour},${item.standardHour * 8},"${item.managedBy}","${item.project}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ML_Machinery_Master_Control_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculatedSimulatorFuel = useMemo(() => {
    const matched = data.find(m => m.code === calcCode);
    if (!matched) return 0;
    return matched.standardHour * calcHours * calcDays;
  }, [data, calcCode, calcHours, calcDays]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      {/* Top Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2.5 rounded-xl text-slate-900 font-bold shadow-md shadow-amber-500/20">
              <Truck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                ML Machinery Master Control
                <span className="text-xs font-normal bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Diesel Fuel Fleet
                </span>
              </h1>
              <p className="text-xs text-slate-400">គ្រប់គ្រងគ្រឿងចក្រ និងការប្រើប្រាស់ប្រេងម៉ាស៊ូត (Code Vehicle & Diesel fuel)</p>
            </div>
          </div>

          {/* Quick Actions & Refuel Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => handleOpenRefuelModal()}
              className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 border border-emerald-400/30"
            >
              <Droplet size={18} className="fill-current text-emerald-200" />
              <span>Refuel with Diesel</span>
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/10"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Vehicle</span>
            </button>
            <button
              onClick={handleResetDefaults}
              title="Reset to Factory Defaults"
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 p-2.5 rounded-lg border border-slate-600"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 border-t border-slate-700/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'border-amber-500 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <LayoutDashboard size={16} />
            Master Fleet Inventory
          </button>
          <button
            onClick={() => setActiveTab('refuel')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'refuel'
                ? 'border-emerald-500 text-emerald-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <History size={16} />
            Daily Refuel Log
            <span className="ml-1 px-1.5 py-0.2 text-xs bg-slate-700 text-slate-300 rounded-full">
              {metrics.totalRefuelEntries}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'border-amber-500 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Calculator size={16} />
            Fuel Simulator
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 font-medium text-sm flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'analytics'
                ? 'border-amber-500 text-amber-400 bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <BarChart3 size={16} />
            Project Analytics
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Total Machinery</p>
              <h3 className="text-2xl font-bold text-white mt-1">{metrics.totalCount} <span className="text-sm font-normal text-slate-400">Units</span></h3>
              <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <User size={12} /> {metrics.assignedDrivers} Operators Assigned
              </p>
            </div>
            <div className="bg-amber-500/10 text-amber-400 p-3 rounded-lg border border-amber-500/20">
              <Truck size={24} />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Est. Std Daily Diesel (8h)</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">{metrics.totalDailyFuel.toLocaleString()} <span className="text-sm font-normal text-slate-400">Liters</span></h3>
              <p className="text-xs text-slate-400 mt-1">Based on hourly standards</p>
            </div>
            <div className="bg-amber-500/10 text-amber-400 p-3 rounded-lg border border-amber-500/20">
              <Fuel size={24} />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Today's Refueled Fuel</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-1">{metrics.todayRefuelTotal.toLocaleString()} <span className="text-sm font-normal text-slate-400">Liters</span></h3>
              <p className="text-xs text-slate-400 mt-1">Logged on {new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-lg border border-emerald-500/20">
              <Droplet size={24} />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Projects Breakdown</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-lg font-bold text-amber-400">MC: {metrics.mcCount}</span>
                <span className="text-slate-600">|</span>
                <span className="text-lg font-bold text-blue-400">GA: {metrics.gaCount}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">MC ({metrics.fuelMC} L/d) - GA ({metrics.fuelGA} L/d)</p>
            </div>
            <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg border border-blue-500/20">
              <HardHat size={24} />
            </div>
          </div>
        </div>

        {/* Global Controls Filter & Search Bar */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search code, vehicle, driver, date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <label className="text-xs text-slate-400 uppercase font-semibold">Project Filter:</label>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
              {['ALL', 'MC', 'GA'].map((proj) => (
                <button
                  key={proj}
                  onClick={() => setProjectFilter(proj)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    projectFilter === proj
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {proj}
                </button>
              ))}
            </div>

            {activeTab === 'refuel' ? (
              <button
                onClick={handleExportRefuelCSV}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-slate-600 ml-2"
              >
                <Download size={16} />
                <span>Export Refuel CSV</span>
              </button>
            ) : (
              <button
                onClick={handleExportFleetCSV}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-slate-600 ml-2"
              >
                <Download size={16} />
                <span>Export Fleet CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: MASTER FLEET TABLE */}
        {activeTab === 'dashboard' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Truck size={20} className="text-amber-500" />
                  ML Machinery Fleet Master Control Table
                </h2>
                <p className="text-xs text-slate-400"> Showing {filteredData.length} of {data.length} registered vehicles</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700 font-semibold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">ល.រ (No)</th>
                    <th className="py-3 px-4">ធុន/ទំហំ (Size)</th>
                    <th className="py-3 px-4">ប្រភេទគ្រឿងចក្រ (Machinery Type)</th>
                    <th className="py-3 px-4">ស្លាកលេខ/ code</th>
                    <th className="py-3 px-4">អ្នកបើកបរ (Driver)</th>
                    <th className="py-3 px-4 text-center">ចំនួន (Qty)</th>
                    <th className="py-3 px-4 text-right">ស្តង់ដារប្រេង/ម៉ោង</th>
                    <th className="py-3 px-4 text-right">បរិមាណប្រេង ៨ម៉ោង/១ថ្ងៃ</th>
                    <th className="py-3 px-4">គ្រប់គ្រងដោយ</th>
                    <th className="py-3 px-4 text-center">គម្រោង</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-12 text-slate-500">
                        No machinery records match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => {
                      const dailyLiters = item.standardHour * 8 * item.qty;
                      return (
                        <tr key={item.id} className="hover:bg-slate-750 transition-colors">
                          <td className="py-3 px-4 font-mono text-slate-400">{item.no}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300 border border-slate-600">
                              {item.size || '-'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-white">{item.type}</td>
                          <td className="py-3 px-4">
                            <span className="font-mono bg-amber-500/10 text-amber-400 font-bold px-2 py-1 rounded border border-amber-500/20">
                              {item.code}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {item.driver !== 'No' ? (
                              <span className="inline-flex items-center gap-1 text-slate-200">
                                <User size={14} className="text-amber-400" />
                                {item.driver}
                              </span>
                            ) : (
                              <span className="text-slate-500 italic">Unassigned</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center font-medium">{item.qty}</td>
                          <td className="py-3 px-4 text-right font-mono text-amber-300">{item.standardHour} L/h</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                            {dailyLiters} L
                          </td>
                          <td className="py-3 px-4 text-slate-300">{item.managedBy}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.project === 'MC'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {item.project}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleOpenModal(item)}
                                className="p-1.5 bg-slate-700 hover:bg-slate-600 text-amber-400 rounded transition-colors"
                                title="Edit Vehicle"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => triggerDeleteConfirm('fleet', item.id, `${item.code} (${item.type})`)}
                                className="p-1.5 bg-slate-700 hover:bg-slate-600 text-rose-400 rounded transition-colors"
                                title="Delete Vehicle"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY REFUEL LOG HISTORY */}
        {activeTab === 'refuel' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/50">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <History size={20} className="text-emerald-400" />
                  Daily Diesel Refueling Log History
                </h2>
                <p className="text-xs text-slate-400">All recorded diesel fuel dispensing logs across fleet machinery</p>
              </div>
              <button
                onClick={() => handleOpenRefuelModal()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>Log New Refuel Event</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700 font-semibold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Vehicle Code / Driver</th>
                    <th className="py-3 px-4">Machinery Type</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4 text-right">Liters Refueled</th>
                    <th className="py-3 px-4">Managed By</th>
                    <th className="py-3 px-4 text-center">Project</th>
                    <th className="py-3 px-4">Notes</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {filteredRefuelLogs.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-12 text-slate-500">
                        No diesel refuel logs recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredRefuelLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-750 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <Calendar size={14} className="text-slate-400" />
                            <span>{log.date}</span>
                            <Clock size={12} className="text-slate-500 ml-1" />
                            <span className="text-slate-400">{log.time}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-mono bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded text-xs border border-amber-500/20 w-fit">
                              {log.code}
                            </span>
                            <span className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                              <User size={10} /> Driver: <strong className="text-slate-200">{log.driver}</strong>
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-200">{log.type}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">
                            {log.size || '-'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 text-base">
                          +{log.liters} L
                        </td>
                        <td className="py-3 px-4 text-slate-300 text-xs">{log.managedBy}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            log.project === 'MC'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {log.project}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-xs italic">{log.notes || '-'}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleOpenRefuelModal(log)}
                              className="p-1.5 bg-slate-700 hover:bg-slate-600 text-emerald-400 rounded transition-colors"
                              title="Edit Refuel Entry"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => triggerDeleteConfirm('refuel', log.id, `${log.code} - ${log.liters}L on ${log.date}`)}
                              className="p-1.5 bg-slate-700 hover:bg-slate-600 text-rose-400 rounded transition-colors"
                              title="Delete Refuel Entry"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FUEL SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calculator size={20} className="text-amber-500" />
                Diesel Dispatch Calculator
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Select Machine Code / Driver</label>
                  <select
                    value={calcCode}
                    onChange={(e) => setCalcCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                  >
                    {data.map((m) => (
                      <option key={m.id} value={m.code}>
                        {m.code} ({m.driver !== 'No' ? `by ${m.driver}` : 'No Driver'}) - {m.type} [{m.standardHour} L/h]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Operating Hours / Day</label>
                    <input
                      type="number"
                      value={calcHours}
                      onChange={(e) => setCalcHours(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                      min="1"
                      max="24"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Number of Days</label>
                    <input
                      type="number"
                      value={calcDays}
                      onChange={(e) => setCalcDays(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                      min="1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 mt-4">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Calculated Required Diesel Fuel</p>
                  <div className="text-4xl font-extrabold text-emerald-400 mt-2 font-mono">
                    {calculatedSimulatorFuel.toLocaleString()} <span className="text-lg font-normal text-slate-400">Liters</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculated as standard hourly rate × hours × days
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Machinery Quick Reference */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-md font-bold text-white mb-3 flex items-center gap-2">
                  <Fuel size={18} className="text-amber-400" />
                  Fuel Hourly Rates Quick List
                </h3>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                  {data.map((m) => (
                    <div key={m.id} className="flex items-center justify-between p-2 bg-slate-900/60 rounded border border-slate-700/50 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{m.code}</span>
                        <span className="text-slate-300">{m.type}</span>
                      </div>
                      <span className="font-mono text-emerald-400 font-semibold">{m.standardHour} L/hr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECT ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-white mb-4">Project Fuel Consumption Allocation</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-amber-400 font-semibold">Project MC</span>
                    <span className="font-mono text-slate-200">{metrics.fuelMC} Liters/day ({Math.round((metrics.fuelMC / metrics.totalDailyFuel) * 100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${(metrics.fuelMC / metrics.totalDailyFuel) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-400 font-semibold">Project GA</span>
                    <span className="font-mono text-slate-200">{metrics.fuelGA} Liters/day ({Math.round((metrics.fuelGA / metrics.totalDailyFuel) * 100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all"
                      style={{ width: `${(metrics.fuelGA / metrics.totalDailyFuel) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-white mb-4">Fleet Driver Assignment Status</h3>
              <div className="flex items-center justify-around py-4">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-emerald-400">{metrics.assignedDrivers}</div>
                  <div className="text-xs text-slate-400 mt-1">Assigned Operators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-rose-400">{metrics.totalCount - metrics.assignedDrivers}</div>
                  <div className="text-xs text-slate-400 mt-1">Unassigned Vehicles</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: REFUEL WITH DIESEL MODAL */}
      {isRefuelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Droplet className="text-emerald-400 fill-current" size={20} />
                {editingRefuelLog ? 'Edit Refuel Log' : 'Refuel Vehicle with Diesel'}
              </h3>
              <button onClick={() => setIsRefuelModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveRefuelLog} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={refuelFormData.date}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Time</label>
                  <input
                    type="time"
                    value={refuelFormData.time}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Machine Code Selection */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs uppercase font-semibold text-slate-400">Select Machine Code / Driver</label>
                  <button
                    type="button"
                    onClick={() => handleRefuelCodeSelect(isCustomRefuel ? data[0]?.code : 'OTHER_CUSTOM')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    {isCustomRefuel ? '← Select Registered Fleet' : '+ Other Car (Custom)'}
                  </button>
                </div>

                {!isCustomRefuel ? (
                  <select
                    value={refuelFormData.code}
                    onChange={(e) => handleRefuelCodeSelect(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                  >
                    {data.map((m) => (
                      <option key={m.id} value={m.code}>
                        {m.code} ({m.driver !== 'No' ? `Driver: ${m.driver}` : 'No Driver'}) - {m.type}
                      </option>
                    ))}
                    <option value="OTHER_CUSTOM">+ Other Car / Custom Vehicle</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="e.g. CAR-999 or TRUCK-X"
                    value={refuelFormData.code}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm font-mono text-amber-400 focus:outline-none focus:border-amber-500"
                    required
                  />
                )}
              </div>

              {/* Machinery Type and Driver Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Machinery Type</label>
                  <input
                    type="text"
                    value={refuelFormData.type}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Driver Code / Name</label>
                  <input
                    type="text"
                    value={refuelFormData.driver}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, driver: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
              </div>

              {/* Size, Managed By, Project */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Size</label>
                  <input
                    type="text"
                    value={refuelFormData.size}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, size: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Managed By</label>
                  <input
                    type="text"
                    value={refuelFormData.managedBy}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, managedBy: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Project</label>
                  <select
                    value={refuelFormData.project}
                    onChange={(e) => setRefuelFormData(prev => ({ ...prev, project: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-slate-200"
                  >
                    <option value="MC">MC</option>
                    <option value="GA">GA</option>
                  </select>
                </div>
              </div>

              {/* Quantity of Fuel Refueled */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-emerald-500/30">
                <label className="block text-xs uppercase font-bold text-emerald-400 mb-1">
                  Quantity of Diesel Fuel Refueled (Liters)
                </label>
                <input
                  type="number"
                  value={refuelFormData.liters}
                  onChange={(e) => setRefuelFormData(prev => ({ ...prev, liters: e.target.value }))}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-lg p-3 text-2xl font-bold font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                  min="1"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Notes / Operational Remarks</label>
                <input
                  type="text"
                  placeholder="e.g. Morning refuel, site shift #1"
                  value={refuelFormData.notes}
                  onChange={(e) => setRefuelFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                />
              </div>

              {isCustomRefuel && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="saveFleet"
                    checked={saveCustomToFleet}
                    onChange={(e) => setSaveCustomToFleet(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                  />
                  <label htmlFor="saveFleet" className="text-xs text-slate-300">
                    Also register this custom car into Master Fleet Inventory
                  </label>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsRefuelModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-emerald-900/30"
                >
                  {editingRefuelLog ? 'Save Refuel Changes' : 'Record Diesel Refuel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT VEHICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="text-amber-500" size={20} />
                {editingItem ? 'Edit Vehicle Record' : 'Add New Vehicle'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">No (ល.រ)</label>
                  <input
                    type="number"
                    name="no"
                    value={formData.no}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Size (ធុន/ទំហំ)</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Machinery Type (ប្រភេទគ្រឿងចក្រ)</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Code (ស្លាកលេខសម្គាល់)</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm font-mono text-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Driver Code (អ្នកបើកបរ)</label>
                  <input
                    type="text"
                    name="driver"
                    value={formData.driver}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Std Fuel (Liters/Hour)</label>
                  <input
                    type="number"
                    name="standardHour"
                    value={formData.standardHour}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Managed By (គ្រប់គ្រងដោយ)</label>
                  <input
                    type="text"
                    name="managedBy"
                    value={formData.managedBy}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">Project (គម្រោង)</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200"
                >
                  <option value="MC">MC</option>
                  <option value="GA">GA</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-sm font-semibold"
                >
                  {editingItem ? 'Save Changes' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md overflow-hidden shadow-2xl p-6">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <div className="p-2.5 bg-rose-500/10 rounded-full border border-rose-500/20">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
            </div>
            
            <p className="text-sm text-slate-300 mb-2">
              Are you sure you want to delete this record?
            </p>
            {deleteConfirmModal.title && (
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs font-mono text-amber-300 mb-6">
                {deleteConfirmModal.title}
              </div>
            )}

            <p className="text-xs text-slate-400 mb-6">This action cannot be undone.</p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal({ isOpen: false, type: null, id: null, title: '' })}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-rose-900/30"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}