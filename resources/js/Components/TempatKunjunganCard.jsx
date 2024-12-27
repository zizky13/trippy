export default function TempatKunjunganCard({ tempatKunjungan }) {
    return (
        <div className="bg-primary-default rounded-lg p-4">
            <p className="namaTempat">{tempatKunjungan.nama}</p>
            <p className="alamatTempat">{tempatKunjungan.alamat}</p>
        </div>
    );
}
