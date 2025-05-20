import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { ChevronDown, FileText, Users, Calendar, MapPin, Phone, Clock, Mail, Search, Eye } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface LoanApplication {
  id: string;
  memberNumber: string;
  name: string;
  nik: string;
  nokk: string;
  ktpFile: string;
  kkFile: string;
  address: string;
  phone: string;
  province: string;
  loanAmount: number;
  purpose: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  applicationDate: string;
}

// Mock loan applications data
const mockLoanApplications: LoanApplication[] = [
  {
    id: '1',
    memberNumber: 'M001',
    name: 'Ahmad Fauzi',
    nik: '3374052501850002',
    nokk: '3374052501850001',
    ktpFile: 'ktp_ahmad.pdf',
    kkFile: 'kk_ahmad.pdf',
    address: 'Jl. Sudirman No. 12, Jakarta Pusat',
    phone: '081234567890',
    province: 'DKI Jakarta',
    loanAmount: 5000000,
    purpose: 'Modal Usaha',
    status: 'approved',
    applicationDate: '10 Oct 2025',
  },
  {
    id: '2',
    memberNumber: 'M002',
    name: 'Siti Aminah',
    nik: '3374052501900003',
    nokk: '3374052501900002',
    ktpFile: 'ktp_siti.pdf',
    kkFile: 'kk_siti.pdf',
    address: 'Jl. Gatot Subroto No. 5, Bandung',
    phone: '082345678901',
    province: 'Jawa Barat',
    loanAmount: 3000000,
    purpose: 'Renovasi Rumah',
    status: 'pending',
    applicationDate: '05 Oct 2025',
  },
  {
    id: '3',
    memberNumber: 'M003',
    name: 'Budi Santoso',
    nik: '3374052501880004',
    nokk: '3374052501880003',
    ktpFile: 'ktp_budi.pdf',
    kkFile: 'kk_budi.pdf',
    address: 'Jl. Ahmad Yani No. 8, Semarang',
    phone: '083456789012',
    province: 'Jawa Tengah',
    loanAmount: 7000000,
    purpose: 'Pendidikan',
    status: 'under_review',
    applicationDate: '01 Oct 2025',
  },
  {
    id: '4',
    memberNumber: 'M004',
    name: 'Dewi Lestari',
    nik: '3374052501950005',
    nokk: '3374052501950004',
    ktpFile: 'ktp_dewi.pdf',
    kkFile: 'kk_dewi.pdf',
    address: 'Jl. Diponegoro No. 15, Surabaya',
    phone: '084567890123',
    province: 'Jawa Timur',
    loanAmount: 4000000,
    purpose: 'Modal Usaha',
    status: 'rejected',
    applicationDate: '20 Sep 2025',
  },
  {
    id: '5',
    memberNumber: 'M005',
    name: 'Eko Prasetyo',
    nik: '3374052501870006',
    nokk: '3374052501870005',
    ktpFile: 'ktp_eko.pdf',
    kkFile: 'kk_eko.pdf',
    address: 'Jl. Raya Serang No. 20, Tangerang',
    phone: '085678901234',
    province: 'Banten',
    loanAmount: 6000000,
    purpose: 'Kebutuhan Pribadi',
    status: 'pending',
    applicationDate: '15 Sep 2025',
  },
];

// List of Indonesian provinces
const provinces = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'
];

const InfoPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<LoanApplication | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqs: FaqItem[] = [
    {
      question: 'Apa saja syarat menjadi anggota koperasi?',
      answer: 'Untuk menjadi anggota koperasi, Anda perlu melengkapi beberapa persyaratan, yaitu: memiliki KTP, mengisi formulir pendaftaran, membayar simpanan pokok sebesar Rp 100.000, dan bersedia mematuhi AD/ART koperasi. Pendaftaran dapat dilakukan secara online melalui aplikasi atau langsung di kantor koperasi terdekat.'
    },
    {
      question: 'Berapa besar iuran bulanan yang harus dibayarkan?',
      answer: 'Iuran bulanan untuk anggota koperasi adalah sebesar Rp 50.000. Pembayaran dapat dilakukan melalui transfer bank, QRIS, atau e-wallet. Batas waktu pembayaran adalah tanggal 10 setiap bulannya.'
    },
    {
      question: 'Bagaimana cara mengajukan pinjaman di koperasi?',
      answer: 'Untuk mengajukan pinjaman, anggota harus sudah terdaftar minimal 3 bulan, membayar iuran secara rutin, dan memiliki riwayat keanggotaan yang baik. Pengajuan dapat dilakukan melalui aplikasi atau langsung di kantor dengan melampirkan dokumen pendukung seperti slip gaji, KTP, dan jaminan (jika diperlukan).'
    },
    {
      question: 'Apa keuntungan menjadi anggota koperasi?',
      answer: 'Keuntungan menjadi anggota koperasi antara lain: mendapatkan SHU (Sisa Hasil Usaha) tahunan, akses ke layanan simpan pinjam dengan bunga kompetitif, program kesejahteraan anggota, pelatihan usaha, promosi produk UMKM, dan berbagai program sosial lainnya.'
    },
    {
      question: 'Bagaimana cara mempromosikan produk UMKM saya di platform koperasi?',
      answer: 'Anggota koperasi dapat mempromosikan produk UMKM dengan mendaftarkan produk melalui aplikasi atau langsung di kantor koperasi. Produk akan melalui proses verifikasi singkat untuk memastikan kualitas dan kesesuaian dengan ketentuan. Setelah disetujui, produk akan ditampilkan di platform digital koperasi dan dapat diakses oleh seluruh anggota.'
    },
  ];

  // Filter loan applications based on search query and selected province
  const filteredLoans = mockLoanApplications.filter(loan =>
    (loan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     loan.nik.includes(searchQuery) ||
     loan.memberNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
     loan.province.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedProvince || loan.province === selectedProvince)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Disetujui</Badge>;
      case 'under_review':
        return <Badge variant="warning">Dalam Review</Badge>;
      case 'pending':
        return <Badge variant="info">Menunggu</Badge>;
      case 'rejected':
        return <Badge variant="danger">Ditolak</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const handleViewLoan = (loan: LoanApplication) => {
    setSelectedLoan(loan);
    setShowViewModal(true);
  };

  return (
    <Layout title="Informasi Koperasi">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Informasi Koperasi</h2>
        <p className="text-gray-600 mt-1">Segala informasi tentang koperasi kami</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Tentang Koperasi Kami</h3>
            </div>
            
            <div className="prose max-w-none">
              <p>
                Koperasi kami didirikan pada tahun 2010 dengan tujuan untuk meningkatkan kesejahteraan anggota dan masyarakat sekitar. Kami berkomitmen untuk memberikan layanan terbaik bagi seluruh anggota dan mendukung pengembangan usaha kecil dan menengah.
              </p>
              <p>
                Dengan lebih dari 200 anggota aktif, koperasi kami telah berkembang menjadi salah satu koperasi terkemuka di wilayah Jakarta. Kami menawarkan berbagai layanan seperti simpan pinjam, pemasaran produk UMKM, pelatihan, dan program sosial.
              </p>
              <h4 className="text-lg font-medium mt-6 mb-3">Visi</h4>
              <p>
                Menjadi koperasi terpercaya yang mampu meningkatkan kesejahteraan anggota dan berkontribusi positif bagi masyarakat.
              </p>
              <h4 className="text-lg font-medium mt-6 mb-3">Misi</h4>
              <ul className="list-disc pl-5">
                <li>Meningkatkan kapasitas ekonomi anggota melalui berbagai program pemberdayaan</li>
                <li>Memberikan layanan keuangan yang adil dan terjangkau</li>
                <li>Mendukung pengembangan UMKM anggota</li>
                <li>Menjalankan program sosial untuk masyarakat sekitar</li>
                <li>Menerapkan prinsip-prinsip koperasi dalam setiap kegiatan</li>
              </ul>
            </div>
          </Card>

          <Card className="mt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Pengajuan Pinjaman</h3>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari pengajuan pinjaman..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Semua Provinsi</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. Anggota
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provinsi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Pinjaman
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLoans.map(loan => (
                    <tr key={loan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.memberNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {loan.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.nik}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.province}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        Rp {loan.loanAmount.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(loan.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleViewLoan(loan)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredLoans.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada pengajuan pinjaman ditemukan</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Users size={20} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Pengurus Koperasi</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Ketua</p>
                <p className="text-sm text-gray-600">H. Ahmad Sudrajat</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Sekretaris</p>
                <p className="text-sm text-gray-600">Dewi Kartika</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Bendahara</p>
                <p className="text-sm text-gray-600">Budi Santoso</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Pengawas</p>
                <p className="text-sm text-gray-600">H. Muhammad Rizki</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Lihat Struktur Organisasi
              </Button>
            </div>
          </Card>
          
          <Card className="mt-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Agenda Mendatang</h3>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <p className="font-medium">Rapat Anggota Tahunan</p>
                <p className="text-sm text-gray-500 mt-1">12 November 2025, 09:00 WIB</p>
                <p className="text-sm mt-1">Aula Utama Kantor Pusat</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <p className="font-medium">Pelatihan UMKM</p>
                <p className="text-sm text-gray-500 mt-1">18 November 2025, 13:00 WIB</p>
                <p className="text-sm mt-1">Online via Zoom</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3 py-2">
                <p className="font-medium">Bazar Produk UMKM</p>
                <p className="text-sm text-gray-500 mt-1">25-27 November 2025</p>
                <p className="text-sm mt-1">Mal Central Park, Jakarta Barat</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <MapPin size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Cabang Koperasi</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Jakarta Pusat</h4>
            <p className="text-sm text-gray-600 mb-2">Jl. KH. Wahid Hasyim No. 10, Jakarta Pusat</p>
            <p className="text-sm flex items-center text-gray-600">
              <Phone size={14} className="mr-1" /> (021) 3456789
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Jakarta Selatan</h4>
            <p className="text-sm text-gray-600 mb-2">Jl. Fatmawati No. 15, Jakarta Selatan</p>
            <p className="text-sm flex items-center text-gray-600">
              <Phone size={14} className="mr-1" /> (021) 7654321
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Jakarta Barat</h4>
            <p className="text-sm text-gray-600 mb-2">Jl. Panjang No. 20, Jakarta Barat</p>
            <p className="text-sm flex items-center text-gray-600">
              <Phone size={14} className="mr-1" /> (021) 5678901
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Jakarta Timur</h4>
            <p className="text-sm text-gray-600 mb-2">Jl. Raya Bekasi KM 18, Jakarta Timur</p>
            <p className="text-sm flex items-center text-gray-600">
              <Phone size={14} className="mr-1" /> (021) 8765432
            </p>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <FileText size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Pertanyaan Umum (FAQ)</h3>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-gray-50"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <ChevronDown
                  size={18}
                  className={`transform transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openFaq === index && (
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
      
      <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-blue-800">Hubungi Kami</h3>
          <p className="text-blue-700 mt-1">Ada pertanyaan atau masukan? Silakan hubungi kami</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium mb-2">Kantor Pusat</h4>
            <p className="text-sm text-center text-gray-700">
              Jl. KH. Wahid Hasyim No. 10, Jakarta Pusat, 10340
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Clock size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium mb-2">Jam Operasional</h4>
            <p className="text-sm text-center text-gray-700">
              Senin - Jumat: 08.00 - 16.00 WIB
              <br />
              Sabtu: 09.00 - 13.00 WIB
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Mail size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium mb-2">Kontak</h4>
            <p className="text-sm text-center text-gray-700">
              Email: info@kopapp.id
              <br />
              Telepon: (021) 3456789
            </p>
          </div>
        </div>
      </div>

      {/* View Loan Application Modal */}
      {showViewModal && selectedLoan && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowViewModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Detail Pengajuan Pinjaman
                    </h3>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">No. Anggota</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.memberNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nama</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">NIK</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.nik}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">No. KK</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.nokk}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.address}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Telepon</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Provinsi</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.province}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Jumlah Pinjaman</dt>
                      <dd className="mt-1 text-sm text-gray-900">Rp {selectedLoan.loanAmount.toLocaleString('id-ID')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tujuan Pinjaman</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.purpose}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tanggal Pengajuan</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.applicationDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900">{getStatusBadge(selectedLoan.status)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">File KTP</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.ktpFile}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">File KK</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedLoan.kkFile}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button 
                  variant="outline"
                  className="w-full sm:ml-3 sm:w-auto"
                  onClick={() => setShowViewModal(false)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default InfoPage;