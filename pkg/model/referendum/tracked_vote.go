package referendum

import (
	"github.com/gohornet/hornet/pkg/model/hornet"
	"github.com/gohornet/hornet/pkg/model/milestone"
	"github.com/gohornet/hornet/pkg/model/utxo"
	"github.com/iotaledger/hive.go/marshalutil"
	iotago "github.com/iotaledger/iota.go/v2"
)

type TrackedVote struct {
	ReferendumID ReferendumID
	OutputID     *iotago.UTXOInputID
	MessageID    hornet.MessageID
	Amount       uint64
	StartIndex   milestone.Index
	EndIndex     milestone.Index
}

func ParseReferendumID(ms *marshalutil.MarshalUtil) (ReferendumID, error) {
	bytes, err := ms.ReadBytes(ReferendumIDLength)
	if err != nil {
		return NullReferendumID, err
	}
	o := ReferendumID{}
	copy(o[:], bytes)
	return o, nil
}

func trackedVote(key []byte, value []byte) (*TrackedVote, error) {

	if len(key) != 67 {
		return nil, ErrInvalidPreviouslyTrackedVote
	}

	if len(value) != 48 {
		return nil, ErrInvalidPreviouslyTrackedVote
	}

	mKey := marshalutil.New(key)

	// Skip prefix
	if _, err := mKey.ReadByte(); err != nil {
		return nil, err
	}

	// Read ReferendumID
	referendumID, err := ParseReferendumID(mKey)
	if err != nil {
		return nil, err
	}

	// Read OutputID
	outputID, err := utxo.ParseOutputID(mKey)
	if err != nil {
		return nil, err
	}

	mValue := marshalutil.New(value)

	messageID, err := utxo.ParseMessageID(mValue)
	if err != nil {
		return nil, err
	}

	amount, err := mValue.ReadUint64()
	if err != nil {
		return nil, err
	}

	start, err := mValue.ReadUint32()
	if err != nil {
		return nil, err
	}

	end, err := mValue.ReadUint32()
	if err != nil {
		return nil, err
	}

	return &TrackedVote{
		ReferendumID: referendumID,
		OutputID:     outputID,
		MessageID:    messageID,
		Amount:       amount,
		StartIndex:   milestone.Index(start),
		EndIndex:     milestone.Index(end),
	}, nil
}

func (t *TrackedVote) valueBytes() []byte {
	m := marshalutil.New(48)
	m.WriteBytes(t.MessageID) // 32 bytes
	m.WriteUint64(t.Amount)
	m.WriteUint32(uint32(t.StartIndex)) // 4 bytes
	m.WriteUint32(uint32(t.EndIndex))   // 4 bytes
	return m.Bytes()
}