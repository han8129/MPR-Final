import {
    StatusBar,
    View,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';
import Header from '../components/game/Header';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../store/GameContext';
import { GLOBAL_STYLES } from '../styles/SharedStyles';
import SectionHeader from '../components/game/SectionHeader';
import { NPC } from '../models/Types';
import { Color } from '../constants/Color';
import { getData } from '../services/DataService';
import Sizes from '../constants/Sizes';
import ModalContentWrapper from '../components/game/ModelContentWrapper';
import SocialInteractions from '../components/game/SocialIntercations';

export default function SocialScreen() {
    const context = useContext(GameContext);
    const [npc, setNpc] = useState<NPC | null>(null);
    const [showModel, setShowModel] = useState(false);
    const [npcList, setNpcList] = useState(new Array<NPC>());

    useEffect(() => {
        getData<NPC>('npc')
            .then((res) => setNpcList(res))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        setShowModel(npc == null ? false : true);
    }, [npc]);

    function closeModel() {
        setNpc(null);
    }

    function setDeedHandler({ name, deed }: { name: string; deed: number }) {
        switch (deed) {
            case 0:
                break;
            case -1:
                context.setBadDeeds([...context.badDeeds, name]);
                break;
            case 1:
                context.setGoodDeeds([...context.goodDeeds, name]);
        }

        setNpc(null);
    }

    const modal =
        npc == null ? (
            <></>
        ) : (
            <ModalContentWrapper
                title={npc.name}
                closeModal={closeModel}
                isOpened={showModel}
            >
                <Text>Relationship: {npc.relationshipType}</Text>
                <Text>Description: {npc.desc}</Text>
                <Text>Marital Status: {npc.maritalStatus}</Text>
                <Text>Work: {npc.work}</Text>
                <SocialInteractions name={npc.name} setDeed={setDeedHandler} />
            </ModalContentWrapper>
        );

    return (
        <>
            <StatusBar hidden={true} />
            <View>
                <Header
                    username={context.username}
                    userTitle={context.title}
                    balance={context.money}
                />
                <SectionHeader heading='Social' />
                <View style={styles.list}>
                    <FlatList
                        data={npcList}
                        renderItem={({ item }) => (
                            <Item
                                npc={item}
                                onPress={() => {
                                    setNpc(item);
                                }}
                            />
                        )}
                    />
                </View>
                {modal}
            </View>
        </>
    );
}

function Item({ npc, onPress }: { npc: NPC; onPress: () => void }) {
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.item, GLOBAL_STYLES.flexColumn]}>
                <View style={[GLOBAL_STYLES.flexRow, styles.cardHeader]}>
                    <Text style={styles.title}>{npc.name}</Text>
                    <Text style={styles.type}>{npc.relationshipType}</Text>
                </View>
                <Text style={styles.description}>{npc.desc}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: Sizes.lg,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    type: {
        fontSize: Sizes.lg,
        fontWeight: 'bold',
        color: Color.red,
    },
    title: {
        fontSize: Sizes.lg,
        fontWeight: 'bold',
    },
    description: {
        fontSize: Sizes.lg,
        marginTop: Sizes.md,
    },
    list: {
        height: '75%',
    },
    cardHeader: {
        justifyContent: 'space-between',
    },
});
