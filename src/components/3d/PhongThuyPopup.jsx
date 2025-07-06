const phongThuyRules = [
    {
        menh: ['Hoả'],
        so: [1],
        menh_nen_dung: ['Hoả, Kim'],
        menh_nen_tranh: ['Thổ'],
        huong_nen_dat: ['Đông', 'Đông Nam'],
        huong_nen_tranh: ['Tây'],
        do_vat_nen_dung: ['chair', 'shelf'],
        do_vat_nen_tranh: ['metal_vase']
    },
    {
        menh: ['Kim'],
        so: [1],
        menh_nen_dung: ['Kim', 'Thổ'],
        menh_nen_tranh: ['Hỏa', 'Mộc'],
        huong_nen_dat: ['Tây', 'Tây Bắc'],
        huong_nen_tranh: ['Nam'],
        do_vat_nen_dung: ['shelf'],
        do_vat_nen_tranh: ['plant_pot']
    }
]

export default function PhongThuyPopup({ menh, nameModel, huong }) {
    // tìm rule phù hợp với mệnh
    const rule = phongThuyRules.find(r => r.menh.includes(menh))

    let noiDung = '❓ Không có gợi ý phong thủy cho vật này hoặc hướng này.'

    if (rule) {
        const hopDoVat = rule.do_vat_nen_dung.includes(nameModel)
        const tranhDoVat = rule.do_vat_nen_tranh.includes(nameModel)
        const hopHuong = rule.huong_nen_dat.includes(huong)
        const tranhHuong = rule.huong_nen_tranh.includes(huong)

        if (hopDoVat && hopHuong) {
            noiDung = `✔️ Mệnh ${menh} nên đặt ${nameModel} ở hướng ${huong}.`
        } else if (tranhDoVat || tranhHuong) {
            noiDung = `❌ Mệnh ${menh} không nên đặt ${nameModel} ở hướng ${huong}.`
        } else {
            noiDung = `⚠️ Mệnh ${menh} đặt ${nameModel} ở hướng ${huong} không xung không hợp.`
        }
    }

    return (
        <div style={{
            position: 'absolute',
            top: '5%',
            right: '17%',
            transform: 'translateX(-50%)',
            width: 300,
            padding: 16,
            borderRadius: 10,
            background: 'rgba(48, 48, 48, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            zIndex: 999,
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            maxHeight: 200,
            overflowY: 'auto',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line'
        }}>
            <h3 style={{ margin: 0, fontSize: 18, marginBottom: 4 }}>
                Phong thủy: {nameModel}
            </h3>
            <p style={{ margin: 0, fontSize: 14 }}>
                Mệnh: <strong>{menh}</strong> – Hướng: <strong>{huong}</strong>
            </p>
            <p style={{ fontSize: 14, marginTop: 8 }}>
                👉 {noiDung}
            </p>
        </div>
    )
}