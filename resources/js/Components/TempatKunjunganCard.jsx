import { IoMdClose } from "react-icons/io";

export default function TempatKunjunganCard({ tempatKunjungan, onClick }) {
    return (
        <div className="bg-primary-default rounded-lg p-4 relative">
            <p className="namaTempat text-white">{tempatKunjungan.nama}</p>
            <p className="alamatTempat text-white">{tempatKunjungan.alamat}</p>
            <button
                className="closeButton absolute top-3 right-5"
                onClick={onClick}
            >
                <IoMdClose className="text-white" />
            </button>
        </div>
    );
}
