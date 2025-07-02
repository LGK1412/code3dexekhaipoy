const goiYTheoModel = {
    chair: {
        Bắc: {
            nen: ['Thủy'],
            tranh: ['Hỏa', 'Thổ'],
        },
        Nam: {
            nen: ['Hỏa', 'Thổ'],
            tranh: ['Kim', 'Thủy'],
        },
        Đông: {
            nen: ['Mộc', 'Hỏa'],
            tranh: ['Thổ'],
        },
        Tây: {
            nen: ['Kim'],
            tranh: ['Mộc', 'Hỏa'],
        },
    },
    shelf: {
        Bắc: {
            nen: ['Kim'],
            tranh: ['Mộc'],
        },
        Nam: {
            nen: ['Thổ'],
            tranh: ['Thủy'],
        },
        Đông: {
            nen: ['Hỏa'],
            tranh: ['Kim'],
        },
        Tây: {
            nen: ['Mộc'],
            tranh: ['Thổ'],
        },
    },
}

export default function PhongThuyPopup({ menh, nameModel, huong }) {
    const goiY = goiYTheoModel[nameModel]?.[huong]

    let noiDung = '❓ Không có gợi ý phong thủy cho vật này hoặc hướng này.'

    if (goiY) {
        if (goiY.nen.includes(menh)) {
            noiDung = `✔️ Mệnh ${menh} nên đặt ${nameModel} ở hướng ${huong}.`
        } else if (goiY.tranh.includes(menh)) {
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
            // ⚠️ thêm dòng này để hạn chế chiều cao nếu nội dung quá dài
            maxHeight: 200,
            overflowY: 'auto',
            // ✨ fix text bị kéo dài
            wordBreak: 'break-word',
            whiteSpace: 'pre-line'
        }}>
            <h3 style={{ margin: 0, fontSize: 18, marginBottom: 4 }}>
                📌 Phong thủy: {nameModel}
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
